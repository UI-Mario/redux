/**
 * Prints a warning in the console if it exists.
 *
 * @param message The warning message.
 */
// TODO:有点好奇，console啥时候会没有(console是浏览器给的)
// https://developer.mozilla.org/en-US/docs/Web/API/console
export default function warning(message: string): void {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message)
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message)
  } catch (e) {} // eslint-disable-line no-empty
}
