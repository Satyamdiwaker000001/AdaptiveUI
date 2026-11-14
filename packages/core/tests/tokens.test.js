import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const tokensCssPath = resolve(__dirname, '../styles/tokens.css');
const utilitiesCssPath = resolve(__dirname, '../styles/utilities.css');

const tokensCss = readFileSync(tokensCssPath, 'utf8');
const utilitiesCss = readFileSync(utilitiesCssPath, 'utf8');

describe('CSS Design Tokens & Styling Foundation', () => {
  it('enforces --aui- prefix on all declared CSS variables in tokens.css', () => {
    const varMatches = [...tokensCss.matchAll(/--([a-zA-Z0-9_-]+)\s*:/g)];
    assert.ok(varMatches.length > 0, 'Tokens must declare custom properties');

    for (const match of varMatches) {
      const varName = match[0].split(':')[0].trim();
      assert.ok(
        varName.startsWith('--aui-'),
        `Custom property ${varName} must begin with --aui- prefix`
      );
    }
  });

  it('defines all required design token categories', () => {
    // 1. Colors
    assert.ok(tokensCss.includes('--aui-color-primary:'), 'Primary color token must be defined');
    assert.ok(tokensCss.includes('--aui-color-gray-50:'), 'Gray scale color tokens must be defined');
    assert.ok(tokensCss.includes('--aui-color-bg:'), 'Background color token must be defined');
    assert.ok(tokensCss.includes('--aui-color-text:'), 'Text color token must be defined');

    // 2. Typography
    assert.ok(tokensCss.includes('--aui-font-family-sans:'), 'Sans font token must be defined');
    assert.ok(tokensCss.includes('--aui-font-size-md:'), 'Font size token must be defined');
    assert.ok(tokensCss.includes('--aui-font-weight-medium:'), 'Font weight token must be defined');
    assert.ok(tokensCss.includes('--aui-line-height-normal:'), 'Line height token must be defined');

    // 3. Spacing
    assert.ok(tokensCss.includes('--aui-space-1:'), 'Spacing token --aui-space-1 must be defined');
    assert.ok(tokensCss.includes('--aui-space-4:'), 'Spacing token --aui-space-4 must be defined');

    // 4. Border Radius
    assert.ok(tokensCss.includes('--aui-radius-sm:'), 'Border radius token must be defined');
    assert.ok(tokensCss.includes('--aui-radius-full:'), 'Full radius token must be defined');

    // 5. Shadows
    assert.ok(tokensCss.includes('--aui-shadow-sm:'), 'Shadow sm token must be defined');
    assert.ok(tokensCss.includes('--aui-shadow-md:'), 'Shadow md token must be defined');

    // 6. Breakpoints
    assert.ok(tokensCss.includes('--aui-breakpoint-sm:'), 'Breakpoint sm must be defined');
    assert.ok(tokensCss.includes('--aui-breakpoint-md:'), 'Breakpoint md must be defined');
    assert.ok(tokensCss.includes('--aui-breakpoint-lg:'), 'Breakpoint lg must be defined');
  });

  it('defines both light and dark theme token scopes', () => {
    assert.ok(
      tokensCss.includes('[data-aui-theme="light"]') || tokensCss.includes('.aui-theme-light'),
      'Light theme selector must be defined'
    );
    assert.ok(
      tokensCss.includes('[data-aui-theme="dark"]') || tokensCss.includes('.aui-theme-dark'),
      'Dark theme selector must be defined'
    );
  });

  it('declares CSS layer strategy', () => {
    assert.ok(
      tokensCss.includes('@layer aui.tokens'),
      'Tokens must use @layer aui.tokens'
    );
    assert.ok(
      utilitiesCss.includes('@layer aui.tokens, aui.components, aui.utilities;') ||
      utilitiesCss.includes('@layer aui.utilities'),
      'Utilities must be assigned to @layer aui.utilities'
    );
  });

  it('prohibits global wildcard resets (* {)', () => {
    assert.equal(
      /\*\s*\{/.test(tokensCss),
      false,
      'tokens.css must not use universal wildcard reset (* {)'
    );
    assert.equal(
      /\*\s*\{/.test(utilitiesCss),
      false,
      'utilities.css must not use universal wildcard reset (* {)'
    );
  });

  it('prohibits bare HTML element styling (body {, button {, etc.)', () => {
    const prohibitedElements = ['body', 'html', 'button', 'input', 'h1', 'p', 'div', 'span'];
    for (const el of prohibitedElements) {
      const regex = new RegExp(`^\\s*${el}\\s*\\{`, 'm');
      assert.equal(
        regex.test(tokensCss),
        false,
        `tokens.css must not style bare tag: ${el}`
      );
      assert.equal(
        regex.test(utilitiesCss),
        false,
        `utilities.css must not style bare tag: ${el}`
      );
    }
  });

  it('enforces aui- prefix on all class selectors in utilities.css', () => {
    // Strip comments and @layer statements before checking class selectors
    const cleanCss = utilitiesCss
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/@layer\s+[^;{]+[;{]/g, '');
    const classMatches = [...cleanCss.matchAll(/\.([a-zA-Z_-][a-zA-Z0-9_-]*)/g)];
    assert.ok(classMatches.length > 0, 'Utilities must declare class selectors');

    for (const match of classMatches) {
      const className = match[1];
      assert.ok(
        className.startsWith('aui-'),
        `Class selector .${className} in utilities.css must start with .aui-`
      );
    }
  });
});
