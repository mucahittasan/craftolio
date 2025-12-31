export function validateAndShowErrors(
  trigger: () => Promise<boolean>,
  formId: string,
): Promise<boolean> {
  return trigger().then((isValid) => {
    if (!isValid) {
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
