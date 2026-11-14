import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageJsonPath = resolve(__dirname, '../package.json');
const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

describe('@adaptiveui/core package configuration', () => {
  it('declares ESM type module', () => {
    assert.equal(pkg.type, 'module');
  });

  it('has NO dependencies on React or React DOM', () => {
    const deps = pkg.dependencies || {};
    const peerDeps = pkg.peerDependencies || {};

    assert.equal(deps['react'], undefined, 'Core must not have react in dependencies');
    assert.equal(deps['react-dom'], undefined, 'Core must not have react-dom in dependencies');
    assert.equal(peerDeps['react'], undefined, 'Core must not have react in peerDependencies');
    assert.equal(peerDeps['react-dom'], undefined, 'Core must not have react-dom in peerDependencies');
  });

  it('has zero external runtime dependencies', () => {
    const deps = pkg.dependencies || {};
    assert.deepEqual(Object.keys(deps), []);
  });

  it('defines sideEffects for CSS files', () => {
    assert.ok(Array.isArray(pkg.sideEffects));
    assert.ok(pkg.sideEffects.includes('*.css'));
  });

  it('declares required subpath exports', () => {
    assert.ok(pkg.exports, 'Exports field must be defined');
    assert.ok(pkg.exports['.'], 'Root export must be defined');
    assert.ok(pkg.exports['./tokens.css'], './tokens.css export must be defined');
    assert.ok(pkg.exports['./utilities.css'], './utilities.css export must be defined');
    assert.ok(pkg.exports['./styles.css'], './styles.css export must be defined');
  });

  it('ensures all exported target files exist on disk', () => {
    const baseDir = resolve(__dirname, '..');

    const checkFile = (exportValue) => {
      const target = typeof exportValue === 'string' ? exportValue : exportValue.default || exportValue.import;
      const fullPath = resolve(baseDir, target);
      assert.ok(existsSync(fullPath), `Target file must exist: ${target}`);
    };

    checkFile(pkg.exports['.']);
    checkFile(pkg.exports['./tokens.css']);
    checkFile(pkg.exports['./utilities.css']);
    checkFile(pkg.exports['./styles.css']);
  });
});

