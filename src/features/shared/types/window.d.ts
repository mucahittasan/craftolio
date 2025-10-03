/**
 * Global window type augmentation for form triggers
 * This allows type-safe access to form validation triggers across the app
 */

export {};

declare global {
  interface Window {
    __profileFormTrigger?: () => Promise<boolean>;
    __experienceFormTrigger?: () => Promise<boolean>;
    __educationFormTrigger?: () => Promise<boolean>;
    __projectFormTrigger?: () => Promise<boolean>;
  }
}
