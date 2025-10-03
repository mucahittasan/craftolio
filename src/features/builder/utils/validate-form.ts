/**
 * Triggers form validation and scrolls to first error
 */
export function validateAndShowErrors(
  trigger: () => Promise<boolean>,
  formId: string,
): Promise<boolean> {
  return trigger().then((isValid) => {
    if (!isValid) {
      // Scroll to first error
      setTimeout(() => {
        const firstError = document.querySelector(
          `#${formId} .border-destructive`,
        );
        if (firstError) {
          firstError.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
      }, 100);
    }
    return isValid;
  });
}
