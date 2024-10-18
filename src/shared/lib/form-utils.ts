/**
 * Disables the input of spaces in the text field..
 * @param event - Key press event.
 */

export function handleKeyPress(
  event: React.KeyboardEvent<HTMLInputElement>,
): void {
  if (event.key === ' ') {
    event.preventDefault();
  }
}
