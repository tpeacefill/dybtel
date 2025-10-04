import { useState, useCallback, useEffect } from 'react'
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

  // Check for saved credentials
  const getSavedCredentials = () => {
    const savedEmail = localStorage.getItem('savedEmail')
    const savedPassword = localStorage.getItem('savedPassword')
    return { email: savedEmail, password: savedPassword }
  }

  // Save credentials to localStorage
  const saveCredentials = (email: string, password: string) => {
    localStorage.setItem('savedEmail', email)
    localStorage.setItem('savedPassword', password)
  }

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

  // Prefill form with saved credentials on component mount
  useEffect(() => {
    const { email, password } = getSavedCredentials()
    if (email) emailField.setValue(email)
    if (password) passwordField.setValue(password)
  }, [emailField, passwordField])

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
      
      // Check if user is logging in with saved credentials
      const { email: savedEmail, password: savedPassword } = getSavedCredentials()
      const isReturningUser = savedEmail === emailField.value && savedPassword === passwordField.value
      
      // Save credentials for future logins
      saveCredentials(emailField.value, passwordField.value)
      
      // Store email in global state
      login(emailField.value)
      
      // Navigate based on whether user is returning or new
      if (isReturningUser) {
        // Navigate to Dashboard for returning users
        window.location.href = '/dashboard'
      } else {
        // Navigate to TopUp for new users
        onSuccess?.()
      }
    } finally {
      setIsLoading(false)
    }
  }, [emailField.value, passwordField.value, login, onSuccess, isLoading, handleValidationErrors])


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


