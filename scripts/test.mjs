import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import test from 'node:test';
import assert from 'node:assert/strict';

const root = process.cwd();
const distDir = path.join(root, 'dist');

execFileSync(process.execPath, ['scripts/build.mjs'], { stdio: 'inherit' });

test('index page is generated', () => {
  const indexFile = path.join(distDir, 'index.html');
  assert.equal(fs.existsSync(indexFile), true);
  const html = fs.readFileSync(indexFile, 'utf8');
  assert.match(html, /GitHub Actions Markdown Pages 예제/);
  assert.match(html, /<article class="markdown-body">/);
});

test('guide page is generated', () => {
  const guideFile = path.join(distDir, 'guide', 'index.html');
  assert.equal(fs.existsSync(guideFile), true);
  const html = fs.readFileSync(guideFile, 'utf8');
  assert.match(html, /배포 가이드/);
});
