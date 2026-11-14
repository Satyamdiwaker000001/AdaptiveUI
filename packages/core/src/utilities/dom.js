/**
 * Safe check to determine if code is running in a browser DOM environment.
 * Useful for guards against running browser-only code during SSR.
 *
 * @type {boolean}
 */
export const canUseDOM = Boolean(
  typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
);

