import { useState } from 'react'
import { z } from 'zod'
import worldMap from '../assets/world-map.svg'
import FormField from '../components/FormField'
import PrimaryButton from '../components/PrimaryButton'

export default function Login({ onSuccess }: { onSuccess?: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value)
    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const schema = z.object({
      email: z.string().min(1, 'Email is required').email('Enter a valid email'),
      password: z.string().min(6, 'Password must be at least 6 characters'),
    })

    const result = schema.safeParse({ email, password })
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
    // TODO: integrate with backend auth
    onSuccess?.()
  }

  return (
    <div className="relative min-h-screen bg-[#67b58d]">
      <img src={worldMap} alt="World map" className="pointer-events-none absolute inset-0 h-full w-full object-cover" />

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
                />
                <FormField
                  id="password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  error={errors.password}
                />
                <PrimaryButton type="submit" className="mt-2">Login</PrimaryButton>
              </form>
              <p className="mt-6 mb-2 text-center text-sm text-gray-600">
                Don’t have an account? <a href="#" className="font-semibold text-primary hover:underline">Signup</a>
              </p>
        </div>
        {/* Safe area spacer for iOS/Android bottom bars */}
        <div className="h-[env(safe-area-inset-bottom)] lg:hidden" />
      </div>
    </div>
  )
}


