import { useState } from 'react'
import worldMap from '../assets/world-map.svg'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: integrate with backend auth
  }

  return (
    <div className="relative min-h-screen bg-[#67b58d]">
      <img src={worldMap} alt="World map" className="pointer-events-none absolute inset-0 h-full w-full object-cover" />

      {/* Form area: mobile = bottom sheet; desktop = centered card */}
      <div className="absolute bottom-4 left-0 right-0 z-10 rounded-[48px] bg-[#ededed] px-6 pt-12 pb-24 shadow-[0_-12px_28px_rgba(0,0,0,0.12)] lg:static lg:bg-transparent lg:p-0 lg:shadow-none lg:flex lg:min-h-screen lg:items-center lg:justify-center">
        <div className="relative z-20 mx-auto w-full max-w-sm lg:rounded-2xl lg:bg-[#ededed] lg:p-8 lg:shadow-xl">
              <h2 className="text-2xl font-semibold text-primary">Login</h2>
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-gray-500">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none ring-primary focus:ring-1 focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-xs font-medium text-gray-500">Password</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none ring-primary focus:ring-1 focus:border-primary"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 w-full rounded-2xl bg-primary px-6 py-3 text-lg font-regular text-white shadow-[0_8px_14px_rgba(0,0,0,0.18)] transition hover:brightness-95"
                >
                  Login
                </button>
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


