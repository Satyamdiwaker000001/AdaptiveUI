# AdaptiveUI

AdaptiveUI is a modular, React-first, JavaScript UI component library designed with a CSS-first architecture, zero runtime overhead, and strict adherence to accessibility standards.

---

## 1. Architectural Philosophy

AdaptiveUI is engineered around key locked decisions:

- **Framework**: React 18 & 19 compatible. Functional components and hooks only.
- **Language**: Pure JavaScript (ES2022+ with JSX). TypeScript is deliberately excluded to maintain a lean, build-free authoring experience and low barrier to entry. JSDoc provides rich editor autocomplete and type safety.
- **Styling**: CSS-first. No mandatory Tailwind, PostCSS, or CSS-in-JS dependencies. All styling is isolated via namespaced CSS classes (`aui-*`) and custom properties (`--aui-*`).
- **Package Management & Monorepo**: npm with npm Workspaces (`packages/*`, `apps/*`).
- **Build Tooling**: Vite/Rollup (to be configured in subsequent phases for optimized ESM distribution).
- **Distribution Model**:
  1. **Independent npm packages**: Developers can install only what they need (e.g., `@adaptiveui/button`), keeping dependency graphs clean and installation lightweight.
  2. **Single meta-package (`adaptiveui`)**: A unified package bundling all components for teams desiring a complete suite.
  3. **Identical implementations**: Both distribution models consume the exact same component sources from the monorepo to guarantee behavioral parity.

---

## 2. Product Rules

1. **Granular Installation**: Developers can install only the components they need without pulling down unrelated packages.
2. **Dependency Isolation**: Installing one component will never install unrelated components or heavy transitive dependencies.
3. **Flexible Packaging**: Developers can opt for individual component packages or the complete `adaptiveui` library.
4. **Customizability**: High-degree theming and visual customization through CSS custom properties and un-opinionated DOM structures.
5. **Non-Invasive Styling**: Styles strictly avoid global resets, element-level selectors (`*`, `body`, `h1`), or opinionated box-sizing overrides.
6. **React as Peer Dependency**: React and ReactDOM are peer dependencies and are never bundled into components.
7. **Lightweight & Tree-Shakeable**: Clean ES module exports guarantee dead-code elimination.
8. **Mandatory Accessibility**: Every component is built with semantic HTML, keyboard operability, ARIA attributes, and verified with `eslint-plugin-jsx-a11y`.
9. **No TypeScript**: TypeScript is not permitted anywhere in the library.
10. **Lean Design**: Zero unnecessary bloat, utility libraries, or over-engineered abstractions.

---

## 3. Monorepo Structure

```text
AdaptiveUI/
├── apps/                 # Future demo apps, playground, and documentation site
├── packages/             # Individual component packages & unified adaptiveui package
├── docs/                 # Architectural docs and engineering conventions
│   └── conventions.md    # JavaScript, CSS, and Accessibility guidelines
├── eslint.config.js      # Monorepo-wide ESLint 9 configuration (React, Hooks, a11y)
├── package.json          # Root workspace configuration
└── README.md             # Project overview and architecture guide
```

---

## 4. Development Scripts

From the repository root:

- `npm run lint`: Runs ESLint across all workspaces and source files.
- `npm run lint:fix`: Automatically fixes fixable lint and formatting issues.

---

## 5. Roadmap

- **Phase 0**: Monorepo foundation, workspace structure, conventions, linting configuration. *(Complete)*
- **Phase 1**: Core architecture, `@adaptiveui/core`, design tokens, CSS layer strategy, package architecture specifications. *(Complete)*
- **Phase 2+**: Core component implementations, accessibility validation, and test harness.
