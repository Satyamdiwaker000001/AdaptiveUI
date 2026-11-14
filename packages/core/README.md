# @adaptiveui/core

`@adaptiveui/core` is the foundational package for the AdaptiveUI component library. It provides framework-independent design tokens, CSS layer architecture, shared utilities, and accessibility helpers.

Core contains **no React dependency** and **no UI components**. It serves as the single source of truth for design tokens and utilities across the entire AdaptiveUI ecosystem.

---

## Features

- **CSS-First Design Tokens**: Comprehensive CSS custom property system prefixed with `--aui-`.
- **Zero Global Pollution**: No CSS resets, no wildcard selectors (`*`), and no bare HTML element styling (`body`, `button`, etc.).
- **Opt-In Theming**: Built-in support for Light and Dark themes via data attributes (`data-aui-theme="light"` / `data-aui-theme="dark"`), utility classes (`.aui-theme-dark`), and system preferences.
- **CSS Layer Architecture**: Utilizes `@layer aui.tokens, aui.components, aui.utilities;` allowing consumers to override any library style cleanly without `!important`.
- **Framework-Independent Utilities**: Lightweight JavaScript utilities (`cx`, `createId`, `canUseDOM`) with zero external dependencies.

---

## Installation

Within the AdaptiveUI monorepo, packages consume `@adaptiveui/core` directly via npm Workspaces:

```bash
npm install @adaptiveui/core
```

---

## Styling & Token Usage

Import tokens and utilities into your application or package stylesheet:

### Option 1: Complete Core Stylesheet
```javascript
import '@adaptiveui/core/styles.css';
```

### Option 2: Granular Opt-In Imports
```javascript
// Import only design tokens
import '@adaptiveui/core/tokens.css';

// Import only utility classes (e.g., .aui-sr-only)
import '@adaptiveui/core/utilities.css';
```

---

## Theming

AdaptiveUI supports seamless light and dark mode switching:

```html
<!-- Explicit Light Theme -->
<html data-aui-theme="light">
  ...
</html>

<!-- Explicit Dark Theme -->
<html data-aui-theme="dark">
  ...
</html>

<!-- Follow System Preference -->
<html data-aui-theme="auto">
  ...
</html>
```

Alternatively, scope themes to specific subtrees using `.aui-theme-light` or `.aui-theme-dark`.

---

## Token Reference

All tokens are exposed as CSS custom properties with the `--aui-` prefix:

| Category | Token Examples | Description |
| :--- | :--- | :--- |
| **Colors (Neutral)** | `--aui-color-gray-50` ... `--aui-color-gray-950` | 11-step neutral grayscale |
| **Colors (Intent)** | `--aui-color-primary`, `--aui-color-success`, `--aui-color-danger`, `--aui-color-warning` | Brand and semantic status colors |
| **Colors (Surface)** | `--aui-color-bg`, `--aui-color-surface`, `--aui-color-text`, `--aui-color-border` | Theme-reactive surfaces |
| **Typography** | `--aui-font-family-sans`, `--aui-font-size-md`, `--aui-font-weight-medium`, `--aui-line-height-normal` | Type scales, fonts, and metrics |
| **Spacing** | `--aui-space-1` (4px), `--aui-space-2` (8px), `--aui-space-4` (16px), `--aui-space-8` (32px) | Proportional layout spacing |
| **Border Radius** | `--aui-radius-sm` (2px), `--aui-radius-md` (4px), `--aui-radius-lg` (8px), `--aui-radius-full` | Component corner radii |
| **Shadows** | `--aui-shadow-sm`, `--aui-shadow-md`, `--aui-shadow-lg`, `--aui-shadow-xl` | Elevation shadows |
| **Breakpoints** | `--aui-breakpoint-sm` (640px), `--aui-breakpoint-md` (768px), `--aui-breakpoint-lg` (1024px) | Documented design scale values |

---

## JavaScript Utilities

Import utilities from `@adaptiveui/core`:

```javascript
import { cx, createId, canUseDOM } from '@adaptiveui/core';

// 1. Conditional Class Names (cx / classNames)
const className = cx('aui-btn', isPrimary && 'aui-btn--primary', { 'is-active': active });

// 2. Unique Element IDs for Accessibility
const inputId = createId('input'); // "input-1"
const errorId = createId('error'); // "error-2"

// 3. Environment Guard
if (canUseDOM) {
  // Safe to access window or document
}
```

