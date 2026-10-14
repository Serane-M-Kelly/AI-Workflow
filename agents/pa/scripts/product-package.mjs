#!/usr/bin/env node
// Node >=22, built-ins only. Full validation delegates to the actual starter.
import { readFile, writeFile, mkdir, lstat, readdir, copyFile, rm, realpath } from 'node:fs/promises';
import { resolve, dirname, join, relative, isAbsolute, basename } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const schemaPath = fileURLToPath(new URL('../references/product-package-v1.schema.json', import.meta.url));
const schema = JSON.parse(await readFile(schemaPath, 'utf8'));
const documentNames = Object.values(schema.properties.contents.properties).map(value => value.const);
const fail = message => { throw new Error(message); };
const inside = (root, path) => { const rel = relative(root, path); return !isAbsolute(rel) && rel !== '..' && !rel.startsWith('../') && !rel.startsWith('..\\'); };
const hash = data => createHash('sha256').update(data).digest('hex');

function validateDates(manifest) {
  for (const [name, value] of [['created_at', manifest.created_at], ['updated_at', manifest.updated_at], ['reviewed_at', manifest.review?.reviewed_at]]) {
    if (value === null || value === undefined) continue; // Missing fields belong to schema validation.
    const match = typeof value === 'string' && /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(Z|[+-](\d{2}):(\d{2}))$/.exec(value);
    if (!match) fail(`${name} doit être une date ISO 8601 réelle.`);
    const [year, month, day, hour, minute, second] = match.slice(1, 7).map(Number);
    const leap = year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
    const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month < 1 || month > 12 || day < 1 || day > days[month - 1] || hour > 23 || minute > 59 || second > 59 || Number(match[8] ?? 0) > 23 || Number(match[9] ?? 0) > 59 || !Number.isFinite(Date.parse(value))) fail(`${name} doit être une date ISO 8601 réelle.`);
  }
}

function safePath(value) {
  if (typeof value !== 'string' || !value || value.includes('\\') || value.includes('\0') || isAbsolute(value) || /^[A-Za-z]:/.test(value) || value.split('/').some(part => !part || part === '.' || part === '..')) fail('Chemin relatif portable requis.');
  return value;
}
function secretLike(value) {
  const name = basename(value).toLowerCase();
  if (['.env.example', '.env.sample', '.env.template'].includes(name)) return false;
  return name === '.env' || name.startsWith('.env.') || value.toLowerCase().split('/').includes('secrets') || name === 'credentials' || name.startsWith('credentials.');
}
async function ordinaryFile(path) {
  const info = await lstat(path);
  if (!info.isFile() || info.isSymbolicLink()) fail('Une source doit être un fichier ordinaire, sans lien symbolique.');
  // Canonicalize platform aliases above the explicitly selected source file.
  const root = await realpath(dirname(path));
  const result = await realpath(path);
  if (!inside(root, result)) fail('La source sort de son dossier.');
  return result;
}
async function treeFiles(root, current = root) {
  const files = [];
  for (const entry of await readdir(current, { withFileTypes: true })) {
    const path = join(current, entry.name);
    const rel = relative(root, path).split('\\').join('/');
    const info = await lstat(path);
    if (info.isSymbolicLink() || (!info.isFile() && !info.isDirectory())) fail(`Entrée non ordinaire : ${rel}`);
    if (secretLike(rel)) fail(`Nom de secret potentiel refusé : ${rel}`);
    if (info.isDirectory()) files.push(...await treeFiles(root, path));
    else files.push({ path: rel, sha256: hash(await readFile(path)) });
  }
  return files.sort((a, b) => a.path.localeCompare(b.path));
}
function preflight(spec) {
  if (!spec || typeof spec !== 'object' || Array.isArray(spec) || Object.keys(spec).some(key => !['manifest', 'documents', 'attachments'].includes(key))) fail('Entrée attendue : manifest, documents, attachments facultatif.');
  const m = spec.manifest;
  if (!m || m.contract !== 'project-architect-product-package' || m.contract_version !== 1) fail('Contrat product-package v1 requis.');
  for (const field of schema.required) if (!(field in m)) fail(`Champ du manifeste absent : ${field}`);
  for (const field of Object.keys(m)) if (!(field in schema.properties)) fail(`Champ du manifeste inconnu : ${field}`);
  validateDates(m);
  if (!m.contents || Object.keys(m.contents).length !== documentNames.length) fail('Les dix références canoniques sont requises.');
  for (const [key, value] of Object.entries(schema.properties.contents.properties)) if (m.contents[key] !== value.const) fail(`Référence canonique incorrecte : ${key}`);
  const docs = spec.documents;
  if (!docs || Object.keys(docs).length !== documentNames.length) fail('Les dix documents sont requis.');
  for (const name of documentNames) if (typeof docs[name] !== 'string' || !docs[name].trim()) fail(`Document absent ou vide : ${name}`);
  if (m.package_status === 'ready_for_intake' && m.review?.independent_review === 'changes_requested') fail('Une revue demandant des corrections empêche le statut prêt à importer.');
  if (spec.attachments !== undefined && !Array.isArray(spec.attachments)) fail('attachments doit être une liste de fichiers explicites.');
  const paths = new Set(['manifest.yaml', ...documentNames].map(path => path.toLowerCase()));
  for (const item of spec.attachments ?? []) {
    if (!item || typeof item.source !== 'string' || !item.source) fail('Source explicite requise pour chaque pièce jointe.');
    const path = safePath(item.path);
    if (secretLike(path)) fail('Nom de secret potentiel refusé dans les pièces jointes.');
    if (paths.has(path.toLowerCase())) fail(`Destination dupliquée : ${path}`);
    paths.add(path.toLowerCase());
  }
  // This is deliberately a preflight, NOT a replacement for JSON Schema/Ajv.
}
async function engineCheck(root, starter) {
  const modulePath = join(resolve(starter), 'dist/lib/product-package.js');
  const { inspectProductPackage } = await import(pathToFileURL(modulePath).href);
  if (typeof inspectProductPackage !== 'function') fail('Le starter ciblé ne fournit pas inspectProductPackage.');
  const result = await inspectProductPackage(root);
  // Date.parse in some starter versions normalizes nonexistent calendar dates.
  validateDates(result.manifest);
  return {
    validation: 'starter_inspection_passed',
    schema_and_files_checked: true,
    package_id: result.manifest.package_id,
    package_version: result.manifest.package_version,
    source_hash: result.sourceHash,
    warnings: result.warnings,
    import_requested: false,
    human_acceptance_verified: false,
    note: 'Le contrôle du moteur ne prouve ni la vérité du contenu ni son acceptation. L’import vérifie aussi le workspace cible.'
  };
}
export async function buildPackage(input, output, starter) {
  const spec = JSON.parse(await readFile(input, 'utf8'));
  preflight(spec);
  const attached = [];
  for (const item of spec.attachments ?? []) attached.push({ source: await ordinaryFile(resolve(dirname(resolve(input)), item.source)), path: item.path });
  const target = resolve(output);
  // Exclusive reservation: never replace an existing package or version.
  await mkdir(target);
  try {
    await writeFile(join(target, 'manifest.yaml'), JSON.stringify(spec.manifest, null, 2) + '\n', { flag: 'wx' });
    for (const [name, content] of Object.entries(spec.documents)) await writeFile(join(target, name), content, { flag: 'wx' });
    for (const item of attached) {
      const path = resolve(target, item.path);
      if (!inside(target, path)) fail('La destination sort du package.');
      await mkdir(dirname(path), { recursive: true });
      await copyFile(item.source, path, 1); // COPYFILE_EXCL
    }
    const files = await treeFiles(target);
    const result = starter ? await engineCheck(target, starter) : {
      validation: 'preflight_only', schema_and_files_checked: false,
      note: 'Dossier assemblé. Schéma complet et import non vérifiés : relancer check avec --starter.',
      human_acceptance_verified: false, import_requested: false
    };
    return { ...result, directory: target, files };
  } catch (error) {
    await rm(target, { recursive: true, force: true });
    throw error;
  }
}
export async function checkPackage(path, starter) {
  if (!starter) fail('check exige --starter avec une distribution construite pour utiliser son vrai validateur.');
  return engineCheck(resolve(path), starter);
}
async function main() {
  const [action, ...tokens] = process.argv.slice(2);
  if (action === '--help' || !action) {
    process.stdout.write('build --input DOSSIER.json --output NOUVEAU_DOSSIER [--starter DISTRIBUTION]\ncheck --package DOSSIER --starter DISTRIBUTION\nLe manifeste et les dix documents sont fournis dans le JSON. Aucun statut, accord ou résultat n’est inventé.\n');
    return;
  }
  const allowed = action === 'build' ? ['--input', '--output', '--starter'] : action === 'check' ? ['--package', '--starter'] : [];
  if (!allowed.length) fail('Action inconnue. Utiliser build ou check.');
  const args = {};
  for (let i = 0; i < tokens.length; i += 2) {
    if (!allowed.includes(tokens[i]) || !tokens[i + 1] || tokens[i + 1].startsWith('--') || tokens[i] in args) fail('Arguments invalides ou dupliqués.');
    args[tokens[i]] = tokens[i + 1];
  }
  if (action === 'build' && (!args['--input'] || !args['--output'])) fail('build exige --input et --output.');
  if (action === 'check' && !args['--package']) fail('check exige --package.');
  const result = action === 'build' ? await buildPackage(args['--input'], args['--output'], args['--starter']) : await checkPackage(args['--package'], args['--starter']);
  process.stdout.write(JSON.stringify(result, null, 2) + '\n');
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main().catch(error => { process.stderr.write(`À résoudre : ${error.message}\n`); process.exitCode = 1; });
