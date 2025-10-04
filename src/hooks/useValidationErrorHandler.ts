import { ZodError } from 'zod'

interface ValidationErrorHandlerProps<T> {
  error: ZodError
  setErrors: React.Dispatch<React.SetStateAction<T>>
}

export function useValidationErrorHandler<T extends Record<string, string | undefined>>() {
  const handleValidationErrors = ({ error, setErrors }: ValidationErrorHandlerProps<T>) => {
    const fieldErrors: Partial<T> = {}
    
    for (const issue of error.issues) {
      const fieldName = issue.path[0] as keyof T
      if (fieldName) {
        fieldErrors[fieldName] = issue.message as T[keyof T]
      }
    }
    
    setErrors(fieldErrors as T)
  }

  return { handleValidationErrors }
}
