import { useState, useCallback, useMemo } from 'react'
import { z } from 'zod'
import worldMap from '../assets/world-map.svg'
import FormField from '../components/FormField'
import PrimaryButton from '../components/PrimaryButton'
import { useAuthStore } from '../store/authStore'

// Validation schema
const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export default function Login({ onSuccess }: { onSuccess?: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuthStore()

  // Clearing error functions
  const clearEmailError = useCallback(() => {
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: undefined }))
    }
  }, [errors.email])

  const clearPasswordError = useCallback(() => {
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: undefined }))
    }
  }, [errors.password])

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    clearEmailError()
  }, [clearEmailError])

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    clearPasswordError()
  }, [clearPasswordError])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Prevent multiple submissions
    if (isLoading) return
    
    setIsLoading(true)
    
    try {
      const result = loginSchema.safeParse({ email, password })
      
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
      login(email)
      onSuccess?.()
    } finally {
      setIsLoading(false)
    }
  }, [email, password, login, onSuccess, isLoading])

  // Form validation state
  const isFormValid = useMemo(() => {
    return email.length > 0 && password.length >= 6
  }, [email, password])

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
              value={email}
              onChange={handleEmailChange}
              error={errors.email}
              disabled={isLoading}
              autoComplete="email"
              autoFocus
            />
            <FormField
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              error={errors.password}
              disabled={isLoading}
              autoComplete="current-password"
            />
            <PrimaryButton 
              type="submit" 
              className="mt-2"
              disabled={!isFormValid || isLoading}
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


