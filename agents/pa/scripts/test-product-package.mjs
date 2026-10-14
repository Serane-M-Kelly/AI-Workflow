#!/usr/bin/env node
// Run: node scripts/test-product-package.mjs /absolute/starter-distribution
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, access, symlink, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve, join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { buildPackage, checkPackage } from './product-package.mjs';

const starter = process.argv[2] && resolve(process.argv[2]);
if (!starter) throw new Error('Fournir la distribution construite du starter en argument.');
const schema = JSON.parse(await readFile(new URL('../references/product-package-v1.schema.json', import.meta.url), 'utf8'));
const names = Object.fromEntries(Object.entries(schema.properties.contents.properties).map(([k, v]) => [k, v.const]));
const now = new Date().toISOString();
async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'architect-package-'));
  t.after(() => rm(root, { recursive: true, force: true, maxRetries: 3, retryDelay: 50 }));
  const spec = {
    manifest: {
      contract: 'project-architect-product-package', contract_version: 1,
      package_id: 'recettes-demonstration', package_version: 1, package_status: 'ready_for_intake',
      project_name: 'Recettes Demonstration', project_stage: 'concept_defined', decision_owner: 'Kelly',
      created_at: now, updated_at: now, supersedes: null, producer: { name: 'project-architect', surface: 'evaluation-isolee' },
      evidence: { public_research: 'not_required', real_user_validation: 'none', synthetic_material_present: true },
      prototype: { status: 'not_started', canonical_reference: null },
      review: { independent_review: 'not_started', reviewed_at: null },
      confidentiality: { classification: 'private', contains_personal_data: false, restricted_paths: [] }, contents: names
    },
    documents: Object.fromEntries(Object.values(names).map(name => [name, `# ${name}\n\nCas fictif d’évaluation du transfert. Aucun essai humain, prototype ou avis indépendant réalisé.\n`]))
  };
  const input = join(root, 'input.json');
  const save = () => writeFile(input, JSON.stringify(spec));
  await save();
  return { root, input, output: join(root, 'package-v1'), spec, save };
}

await test('le schéma embarqué correspond exactement au contrat du starter testé', async () => {
  assert.deepEqual(schema, JSON.parse(await readFile(join(starter, 'core/schemas/product-package.schema.json'), 'utf8')));
});
await test('assemblage conforme conserve sources, absence de preuve et avertissements', async t => {
  const f = await fixture(t);
  const before = await readFile(f.input);
  const result = await buildPackage(f.input, f.output, starter);
  assert.equal(result.validation, 'starter_inspection_passed');
  assert.equal(result.human_acceptance_verified, false);
  assert(result.warnings.some(x => x.code === 'PRODUCT_PACKAGE_REVIEW_MISSING'));
  assert(result.warnings.some(x => x.code === 'PRODUCT_PACKAGE_USER_EVIDENCE_LIMITED'));
  assert.deepEqual(await readFile(f.input), before);
  assert.deepEqual(JSON.parse(await readFile(join(f.output, 'manifest.yaml'), 'utf8')), f.spec.manifest);
  for (const [name, text] of Object.entries(f.spec.documents)) assert.equal(await readFile(join(f.output, name), 'utf8'), text);
});
await test('sans moteur, le précontrôle ne prétend pas valider le schéma', async t => {
  const f = await fixture(t);
  const result = await buildPackage(f.input, f.output);
  assert.equal(result.validation, 'preflight_only');
  assert.equal(result.schema_and_files_checked, false);
  await assert.rejects(checkPackage(f.output), /exige --starter/);
});
await test('une version existante reste intacte ; une nouvelle version peut être assemblée', async t => {
  const f = await fixture(t);
  await buildPackage(f.input, f.output, starter);
  const before = await readFile(join(f.output, 'manifest.yaml'));
  f.spec.manifest.package_version = 2;
  f.spec.manifest.supersedes = 'recettes-demonstration/v1';
  await f.save();
  await assert.rejects(buildPackage(f.input, f.output, starter), /EEXIST/);
  assert.deepEqual(await readFile(join(f.output, 'manifest.yaml')), before);
  assert.equal((await buildPackage(f.input, join(f.root, 'package-v2'), starter)).package_version, 2);
});
await test('document absent et manifeste invalide refusés sans sortie partielle', async t => {
  const f = await fixture(t);
  const text = f.spec.documents['UX_FLOWS.md'];
  delete f.spec.documents['UX_FLOWS.md'];
  await f.save();
  await assert.rejects(buildPackage(f.input, f.output, starter), /dix documents/);
  await assert.rejects(access(f.output));
  f.spec.documents['UX_FLOWS.md'] = text;
  f.spec.manifest.project_stage = 'launched';
  await f.save();
  await assert.rejects(buildPackage(f.input, f.output, starter), /contrat v1/);
  await assert.rejects(access(f.output));
  f.spec.manifest.project_stage = 'concept_defined';
  f.spec.manifest.created_at = '2026-02-30T10:00:00Z';
  await f.save();
  await assert.rejects(buildPackage(f.input, f.output, starter), /ISO 8601/);
  await assert.rejects(access(f.output));
});
await test('pièce jointe valide conservée ; sorties détournées et liens refusés', async t => {
  const f = await fixture(t);
  const source = join(f.root, 'maquette.html');
  await writeFile(source, '<p>Support de démonstration sans test réel.</p>');
  f.spec.attachments = [{ source, path: 'design/maquette.html' }];
  await f.save();
  await buildPackage(f.input, f.output, starter);
  assert.deepEqual(await readFile(join(f.output, 'design/maquette.html')), await readFile(source));
  for (const path of ['../outside.html', 'design/../outside.html', 'design\\outside.html', 'secrets/token.txt', 'manifest.yaml']) {
    f.spec.attachments = [{ source, path }];
    await f.save();
    await assert.rejects(buildPackage(f.input, join(f.root, 'invalid'), starter));
    await assert.rejects(access(join(f.root, 'invalid')));
  }
  await symlink(source, join(f.root, 'link.html'));
  f.spec.attachments = [{ source: join(f.root, 'link.html'), path: 'design/linked.html' }];
  await f.save();
  await assert.rejects(buildPackage(f.input, join(f.root, 'invalid'), starter), /sans lien symbolique/);
  await assert.rejects(access(join(f.root, 'invalid')));
});
await test('une revue défavorable ne peut pas produire un package prêt à importer', async t => {
  const f = await fixture(t);
  f.spec.manifest.review.independent_review = 'changes_requested';
  await f.save();
  await assert.rejects(buildPackage(f.input, f.output, starter), /corrections/);
  await assert.rejects(access(f.output));
});
await test('import réel idempotent dans le starter sans approbation ni réécriture du brief', async t => {
  const f = await fixture(t);
  await buildPackage(f.input, f.output, starter);
  const cli = join(starter, 'dist/index.js');
  const target = join(f.root, 'project');
  execFileSync(process.execPath, [cli, 'workflow', 'init', target, '--name', f.spec.manifest.project_name, '--owner', 'Kelly'], { encoding: 'utf8' });
  const ws = join(target, 'ai-workspace');
  const before = await readFile(join(ws, 'PROJECT_BRIEF.md'));
  const first = execFileSync(process.execPath, [cli, 'intake', 'import', f.output, ws], { encoding: 'utf8' });
  assert(first.includes('Product-package importé'));
  assert.deepEqual(await readFile(join(ws, 'PROJECT_BRIEF.md')), before);
  const archive = join(ws, 'intake/product-package/recettes-demonstration/v1');
  assert.deepEqual(await readFile(join(archive, 'manifest.yaml')), await readFile(join(f.output, 'manifest.yaml')));
  const second = execFileSync(process.execPath, [cli, 'intake', 'import', f.output, ws], { encoding: 'utf8' });
  assert(second.includes('déjà importé'));
  assert.deepEqual(await readFile(join(ws, 'PROJECT_BRIEF.md')), before);
});
