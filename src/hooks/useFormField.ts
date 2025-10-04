import { useState, useCallback } from 'react'

interface UseFormFieldProps {
  initialValue?: string
  errors: Record<string, string | undefined>
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string | undefined>>>
  fieldName: string
}

export function useFormField({ 
  initialValue = '', 
  errors, 
  setErrors, 
  fieldName 
}: UseFormFieldProps) {
  const [value, setValue] = useState(initialValue)

  const clearError = useCallback(() => {
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: undefined }))
    }
  }, [errors, fieldName, setErrors])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    clearError()
  }, [clearError])

  return {
    value,
    setValue,
    handleChange,
    clearError,
    error: errors[fieldName]
  }
}
