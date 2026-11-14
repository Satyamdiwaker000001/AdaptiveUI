/**
 * Conditionally joins CSS class names together into a single space-delimited string.
 * Supports strings, numbers, arrays, and objects with truthy values.
 *
 * @param {...(string | number | boolean | null | undefined | Record<string, boolean> | Array<unknown>)} args
 * @returns {string} The combined class name string.
 *
 * @example
 * cx('aui-btn', isPrimary && 'aui-btn--primary', { 'is-active': isActive });
 */
export function classNames(...args) {
  const classes = [];

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (!arg) continue;

    const argType = typeof arg;

    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      if (arg.length > 0) {
        const inner = classNames(...arg);
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (argType === 'object') {
      const keys = Object.keys(arg);
      for (let j = 0; j < keys.length; j += 1) {
        const key = keys[j];
        if (arg[key]) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(' ');
}

export const cx = classNames;

