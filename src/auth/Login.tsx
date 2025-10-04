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

  // Validate credentials against saved data
  const validateCredentials = useCallback((email: string, password: string) => {
    const { email: savedEmail, password: savedPassword } = getSavedCredentials()
    
    if (!savedEmail) {
      return { isValid: false, error: 'Email not found. Please sign up first.' }
    }
    
    if (savedEmail !== email) {
      return { isValid: false, error: 'Email not found. Please check your email or sign up.' }
    }
    
    if (savedPassword !== password) {
      return { isValid: false, error: 'Incorrect password. Please try again.' }
    }
    
    return { isValid: true, error: null }
  }, [])

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

  // Clear saved credentials
  const clearSavedCredentials = () => {
    localStorage.removeItem('savedEmail')
    localStorage.removeItem('savedPassword')
    emailField.setValue('')
    passwordField.setValue('')
    setErrors({})
  }

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

      // Validate credentials against saved data
      const credentialValidation = validateCredentials(emailField.value, passwordField.value)
      
      if (!credentialValidation.isValid) {
        setErrors({ email: credentialValidation.error || undefined })
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
  }, [emailField.value, passwordField.value, login, onSuccess, isLoading, handleValidationErrors, validateCredentials])


  return (
    <AuthFormLayout 
      footer={
        <p className="mb-2 text-center text-sm text-gray-600">
          Don't have an account? <a href="#" className="font-semibold text-primary hover:underline cursor-pointer">Signup</a>
        </p>
      }
    >
      <div className="flex items-center justify-between mt-8">
        <h2 className="text-2xl font-semibold text-primary">Login</h2>
        {(emailField.value || passwordField.value) && (
          <button
            type="button"
            onClick={clearSavedCredentials}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1"
            title="Clear saved credentials"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear
          </button>
        )}
      </div>
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


