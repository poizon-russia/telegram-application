import { useEffect } from 'react';
import { toast } from 'sonner';

import type { FieldErrors } from '@/src/shared/types/field-errors';

/**
 * Hook to display errors in the form via toast.
 * @param isErrorsShown - Flag to enable error display.
 * @param errors - Form errors.
 * @param setIsErrorsShown - Function to reset the error flag.
 */

export const useFormErrors = (
  isErrorsShown: boolean,
  errors: FieldErrors,
  setIsErrorsShown: React.Dispatch<React.SetStateAction<boolean>>,
): void => {
  useEffect(() => {
    if (!isErrorsShown) return;

    const displayErrors = (errorObj: FieldErrors, prefix = '') => {
      for (const field in errorObj) {
        if (errorObj[field]?.message) {
          const errorMessage = errorObj[field].message;

          const cleanedPrefix = prefix === 'customer.' ? '' : prefix;

          toast.error(`${cleanedPrefix}${errorMessage}`, {
            position: 'top-right',
          });
        } else if (typeof errorObj[field] === 'object') {
          displayErrors(errorObj[field], `${prefix ? `${prefix} ` : ''}`);
        }
      }
    };

    displayErrors(errors);
    setIsErrorsShown(false);
  }, [isErrorsShown, errors, setIsErrorsShown]);
};
