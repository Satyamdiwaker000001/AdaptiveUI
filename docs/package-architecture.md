# Package Architecture & Component Conventions

This document defines the strict architectural standards for creating, packaging, and distributing UI components in **AdaptiveUI**.

All future component packages must follow the specifications below.

---

## 1. Monorepo Distribution Architecture

AdaptiveUI utilizes a dual-distribution strategy supported by a single monorepo source of truth:

```text
                               ┌─────────────────────────────────┐
                               │       @adaptiveui/core          │
                               │ (tokens, utilities, layers)     │
                               └──────────────┬──────────────────┘
                                              │ internal dependency
                    ┌─────────────────────────┴─────────────────────────┐
                    ▼                                                   ▼
       ┌──────────────────────────┐                       ┌──────────────────────────┐
       │   @adaptiveui/button     │                       │    @adaptiveui/modal     │
       │ (independent npm package)│                       │(independent npm package) │
       └────────────┬─────────────┘                       └─────────────┬────────────┘
                    │                                                   │
                    └─────────────────────────┬─────────────────────────┘
                                              │ re-exports implementation
                                              ▼
                               ┌─────────────────────────────────┐
                               │           adaptiveui            │
                               │    (complete meta-package)      │
                               └─────────────────────────────────┘
```

1. **Independent Component Packages** (`@adaptiveui/[component]`):
   - Developers install only what they need (`npm install @adaptiveui/button`).
   - Installing one component will never install unrelated components.
2. **Unified Meta-Package** (`adaptiveui`):
   - Developers desiring the complete library install `npm install adaptiveui`.
   - Re-exports component packages directly.
3. **Zero Duplication**:
   - Both distribution models share the exact same underlying component files.
   - Code is authored once within its respective component package and never cloned or maintained in parallel.

---

## 2. Component Package Directory Anatomy

Every future component package in `packages/[component-name]/` must follow this structure:

```text
packages/button/
├── src/
│   ├── Button.jsx            # Core component implementation (pure JS + JSX)
│   ├── Button.css            # Scoped component styles
│   └── index.js              # Entrypoint re-exporting component and utilities
├── tests/
│   └── Button.test.jsx       # Component tests
├── package.json              # Package manifest with ESM exports and peerDependencies
└── README.md                 # Documentation and API reference
```

---

## 3. Dependency Rules

1. **Internal Monorepo Dependencies**:
   - Component packages may declare `"dependencies": { "@adaptiveui/core": "^0.0.1" }`.
   - Component packages must **NEVER** depend on sibling component packages (e.g. `@adaptiveui/modal` must never depend on `@adaptiveui/button`).
   - If multiple components require shared non-visual logic, that logic must reside in `@adaptiveui/core`.
2. **External Dependencies**:
   - Zero unnecessary external runtime dependencies.
   - Do not introduce utility libraries (e.g., lodash, uuid, classnames) when core utilities (`cx`, `createId`) suffice.
3. **React Peer Dependency Rules**:
   - React and React DOM must **ALWAYS** be declared as `peerDependencies`:
     ```json
     "peerDependencies": {
       "react": "^18.0.0 || ^19.0.0",
       "react-dom": "^18.0.0 || ^19.0.0"
     }
     ```
   - React and React DOM must **NEVER** appear in `"dependencies"`.
   - React must never be bundled into published outputs.

---

## 4. CSS Ownership and Exports

1. **Component Style Ownership**:
   - Each component owns its styles directly in `src/[Component].css`.
   - Components do not rely on an external preprocessor, Tailwind build step, or CSS-in-JS runtime.
2. **Namespace & Scoping**:
   - Every class selector must strictly use the `aui-` prefix (e.g., `.aui-btn`, `.aui-btn__icon`, `.aui-btn--primary`).
   - Global tag selectors (`button`, `div`, `span`) and universal selectors (`*`) are prohibited.
3. **Token Usage**:
   - Component styles consume design tokens via CSS custom properties with fallbacks:
     ```css
     .aui-btn {
       background-color: var(--aui-btn-bg, var(--aui-color-primary));
       color: var(--aui-btn-color, var(--aui-color-primary-contrast));
       border-radius: var(--aui-btn-radius, var(--aui-radius-md));
       padding: var(--aui-btn-padding-y, var(--aui-space-2)) var(--aui-btn-padding-x, var(--aui-space-4));
     }
     ```
4. **Subpath Export**:
   - Every component package must expose its stylesheet through a documented subpath:
     ```json
     "exports": {
       ".": {
         "import": "./src/index.js",
         "default": "./src/index.js"
       },
       "./styles.css": "./src/Button.css",
       "./package.json": "./package.json"
     }
     ```
   - Consumers can import the component and stylesheet:
     ```javascript
     import { Button } from '@adaptiveui/button';
     import '@adaptiveui/button/styles.css';
     ```

---

## 5. Naming & Authoring Conventions

- **Package Names**: Scoped under `@adaptiveui/` with kebab-case: `@adaptiveui/button`, `@adaptiveui/modal`, `@adaptiveui/text-field`.
- **Component Files**: `PascalCase.jsx` (`Button.jsx`).
- **Hook Files**: `camelCase.js` prefixed with `use` (`useToggle.js`).
- **CSS Files**: `PascalCase.css` matching the component name (`Button.css`).
- **JSDoc**: Every component export must include detailed JSDoc declaring props, default values, and description to maintain full IDE autocomplete in JavaScript.

---

## 6. Aggregation into Complete `adaptiveui` Package

The meta-package `packages/adaptiveui` aggregates all components:

1. **`packages/adaptiveui/package.json`**:
   Declares workspaces dependencies on individual packages:
   ```json
   {
     "name": "adaptiveui",
     "dependencies": {
       "@adaptiveui/core": "^0.0.1",
       "@adaptiveui/button": "^0.0.1"
     }
   }
   ```
2. **`packages/adaptiveui/src/index.js`**:
   Re-exports from each component package:
   ```javascript
   export * from '@adaptiveui/core';
   export * from '@adaptiveui/button';
   ```
3. **`packages/adaptiveui/styles.css`**:
   Combines stylesheets using CSS `@import`:
   ```css
   @import '@adaptiveui/core/styles.css';
   @import '@adaptiveui/button/styles.css';
   ```

---

## 7. Versioning & Release Rules

- All packages follow [Semantic Versioning](https://semver.org/) (`MAJOR.MINOR.PATCH`).
- Breaking changes increment `MAJOR`.
- Feature additions increment `MINOR`.
- Bug fixes and accessibility patches increment `PATCH`.
- When an individual package releases a new version, the meta-package `adaptiveui` is updated to incorporate the latest release.

