import { useState, useCallback } from 'react'
import { z } from 'zod'
import FormField from '../components/FormField'
import PrimaryButton from '../components/PrimaryButton'
import AuthFormLayout from '../components/AuthFormLayout'
import { useAuthStore } from '../store/authStore'
import { useFormField } from '../hooks/useFormField'
import { useValidationErrorHandler } from '../hooks/useValidationErrorHandler'

// Validation schema
const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export default function Login({ onSuccess }: { onSuccess?: () => void }) {
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuthStore()
  const { handleValidationErrors } = useValidationErrorHandler()

  // Use custom hook for form fields
  const emailField = useFormField({
    errors,
    setErrors,
    fieldName: 'email'
  })

  const passwordField = useFormField({
    errors,
    setErrors,
    fieldName: 'password'
  })

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Prevent multiple submissions
    if (isLoading) return
    
    setIsLoading(true)
    
    try {
      const result = loginSchema.safeParse({ email: emailField.value, password: passwordField.value })
      
      if (!result.success) {
        handleValidationErrors({ error: result.error, setErrors })
        return
      }

      setErrors({})
      // Store email in global state and navigate to TopUp
      login(emailField.value)
      onSuccess?.()
    } finally {
      setIsLoading(false)
    }
  }, [emailField.value, passwordField.value, login, onSuccess, isLoading])


  return (
    <AuthFormLayout 
      title="Login"
      footer={
        <p className="mb-2 text-center text-sm text-gray-600">
          Don't have an account? <a href="#" className="font-semibold text-primary hover:underline cursor-pointer">Signup</a>
        </p>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
        <FormField
          id="email"
          label="Email"
          type="email"
          value={emailField.value}
          onChange={emailField.handleChange}
          error={emailField.error}
          disabled={isLoading}
          autoComplete="email"
          autoFocus
        />
        <FormField
          id="password"
          label="Password"
          type="password"
          value={passwordField.value}
          onChange={passwordField.handleChange}
          error={passwordField.error}
          disabled={isLoading}
          autoComplete="current-password"
        />
        <PrimaryButton 
          type="submit" 
          className="mt-2"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </PrimaryButton>
      </form>
    </AuthFormLayout>
  )
}


