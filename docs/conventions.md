# Engineering Conventions

This document outlines the locked conventions and quality standards for **AdaptiveUI**. All components, packages, and applications within this monorepo must adhere to these guidelines.

---

## 1. JavaScript Conventions

### 1.1 Language Standard & Modules
- **Pure JavaScript (ES2022+)**: No TypeScript is permitted. Do not introduce `.ts` or `.tsx` files, TypeScript compilers, or TypeScript devDependencies.
- **ES Modules (ESM)**: All packages use native ESM (`import` / `export`). The root and workspace packages declare `"type": "module"`.
- **File Extensions**:
  - `.jsx`: Used for any file declaring JSX syntax (React components).
  - `.js`: Used for pure JavaScript logic, hooks, utilities, and configuration.
- **File Naming**:
  - Components: `PascalCase.jsx` (e.g., `Button.jsx`, `Modal.jsx`).
  - Hooks: `camelCase.js` prefixed with `use` (e.g., `useId.js`, `useFocusTrap.js`).
  - Utilities: `camelCase.js` (e.g., `dom.js`, `classNames.js`).

### 1.2 React Guidelines
- **React as Peer Dependency**: React and ReactDOM must strictly remain `peerDependencies` in component packages (`"peerDependencies": { "react": "^18.0.0 || ^19.0.0", "react-dom": "^18.0.0 || ^19.0.0" }`). React must never be bundled into published outputs.
- **Modern JSX Runtime**: Code does not require `import React from 'react'`.
- **Pure Functional Components**: All components are written as functional components using React Hooks.
- **Clean Prop Forwarding**:
  - Spread unused props (`...rest`) onto the primary underlying DOM element.
  - Merge consumer `className` and `style` props without overwriting internal classes.
  - Forward refs with `React.forwardRef` where DOM access is necessary.

### 1.3 Documentation & Types
- **Standard JSDoc**: Because TypeScript is not used, write clear JSDoc annotations above component definitions and exported utilities to ensure strong IDE autocomplete and documentation for consumers:
  ```javascript
  /**
   * Primary interactive button component.
   *
   * @param {Object} props
   * @param {'primary' | 'secondary' | 'ghost'} [props.variant='primary']
   * @param {'sm' | 'md' | 'lg'} [props.size='md']
   * @param {boolean} [props.disabled=false]
   * @param {React.ReactNode} props.children
   * @returns {JSX.Element}
   */
  ```

---

## 2. CSS Conventions

### 2.1 CSS-First Philosophy
- **No Mandatory Tailwind or CSS-in-JS**: Components must rely on standard CSS. Consumers should not be forced to install Tailwind, PostCSS plugins, Emotion, or Styled-Components.
- **No Unwanted Global Styles or Resets**:
  - **NEVER** use universal selectors (`*`) or tag selectors (`body`, `button`, `input`, `h1`) without scoping.
  - **NEVER** apply global resets, box-sizing overrides, or font imports at the package level.
  - All style definitions must be explicitly scoped to component class names.

### 2.2 Class Naming & Scoping
- **Prefix Isolation**: All class names must begin with the `aui-` prefix (AdaptiveUI namespace).
  - Component base: `.aui-btn`, `.aui-modal`, `.aui-input`.
  - Child elements: `.aui-btn__icon`, `.aui-modal__header`.
  - State/variant modifiers: `.aui-btn--primary`, `.aui-btn--sm`, `.is-disabled`, `.is-active`.

### 2.3 Customizability & Theming
- **CSS Custom Properties**: Expose configurable CSS variables prefixed with `--aui-`:
  ```css
  .aui-btn {
    --aui-btn-bg: #2563eb;
    --aui-btn-color: #ffffff;
    --aui-btn-padding-y: 0.5rem;
    --aui-btn-padding-x: 1rem;
    --aui-btn-radius: 0.375rem;

    background-color: var(--aui-btn-bg);
    color: var(--aui-btn-color);
    padding: var(--aui-btn-padding-y) var(--aui-btn-padding-x);
    border-radius: var(--aui-btn-radius);
  }
  ```
- **Consumer Overrides**: Consumers can customize styles at the page level, component level, or via `className`/`style` props.

### 2.4 Modular Distribution
- Component styles live co-located with their implementation (e.g., `packages/button/src/Button.css`).
- Installing an individual package imports or ships only its respective CSS, avoiding bundling unrelated component styles.

---

## 3. Accessibility (a11y) Standards

Accessibility is mandatory across all components.

1. **Semantic HTML**: Always favor native interactive HTML elements (`<button>`, `<a>`, `<input>`) over generic `<div>` or `<span>` elements with synthetic handlers.
2. **Keyboard Navigation**:
   - All interactive components must be focusable and operable via standard keyboard interactions (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape`, `Arrow keys`).
   - Focus indicators must remain clearly visible using `:focus-visible`. Never set `outline: none` without providing an equivalent accessible focus ring.
3. **ARIA Standards**:
   - Provide accurate ARIA attributes (`aria-expanded`, `aria-haspopup`, `aria-controls`, `aria-label`, `aria-describedby`) where visual context is insufficient.
   - Use WAI-ARIA authoring practices as the benchmark.
4. **Automated Enforcement**: `eslint-plugin-jsx-a11y` is active in the repository's lint configuration to prevent accessibility regressions.

