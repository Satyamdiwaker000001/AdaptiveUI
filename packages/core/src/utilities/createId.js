let counter = 0;

/**
 * Generates a unique, collision-free element ID with an optional prefix.
 * Useful for ARIA associations (e.g. aria-labelledby, aria-describedby, aria-controls).
 *
 * @param {string} [prefix='aui'] - The prefix to prepend to the ID.
 * @returns {string} The generated ID string (e.g. "aui-1", "button-2").
 */
export function createId(prefix = 'aui') {
  counter += 1;
  return `${prefix}-${counter}`;
}

/**
 * Resets the internal ID counter. Primarily used in test suites to ensure predictable IDs.
 *
 * @returns {void}
 */
export function resetIdCounter() {
  counter = 0;
}

