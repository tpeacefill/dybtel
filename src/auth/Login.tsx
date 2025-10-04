import { useState, useCallback } from 'react'
import { z } from 'zod'
import worldMap from '../assets/world-map.svg'
import FormField from '../components/FormField'
import PrimaryButton from '../components/PrimaryButton'
import { useAuthStore } from '../store/authStore'
import { useFormField } from '../hooks/useFormField'

// Validation schema
const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export default function Login({ onSuccess }: { onSuccess?: () => void }) {
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuthStore()

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
        const fieldErrors: { email?: string; password?: string } = {}
        for (const issue of result.error.issues) {
          if (issue.path[0] === 'email') fieldErrors.email = issue.message
          if (issue.path[0] === 'password') fieldErrors.password = issue.message
        }
        setErrors(fieldErrors)
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
    <div className="relative min-h-screen bg-[#67b58d]">
      <img 
        src={worldMap} 
        alt="World map" 
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        loading="eager" 
      />

      {/* Form area: mobile = bottom sheet; desktop = centered card */}
      <div className="absolute bottom-4 left-0 right-0 z-10 rounded-[48px] bg-[#ededed] px-6 pt-12 pb-24 shadow-[0_-12px_28px_rgba(0,0,0,0.12)] lg:static lg:bg-transparent lg:p-0 lg:shadow-none lg:flex lg:min-h-screen lg:items-center lg:justify-center">
        <div className="relative z-20 mx-auto w-full max-w-sm lg:rounded-2xl lg:bg-[#ededed] lg:p-8 lg:shadow-xl">
          <h2 className="text-2xl font-semibold text-primary">Login</h2>
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
          <p className="mt-6 mb-2 text-center text-sm text-gray-600">
            Don't have an account? <a href="#" className="font-semibold text-primary hover:underline cursor-pointer">Signup</a>
          </p>
        </div>
        {/* Safe area spacer for iOS/Android bottom bars */}
        <div className="h-[env(safe-area-inset-bottom)] lg:hidden" />
      </div>
    </div>
  )
}


