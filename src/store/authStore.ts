import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  email: string
  isLoggedIn: boolean
  setEmail: (email: string) => void
  login: (email: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      email: '',
      isLoggedIn: false,
      setEmail: (email: string) => set({ email }),
      login: (email: string) => set({ email, isLoggedIn: true }),
      logout: () => set({ email: '', isLoggedIn: false }),
    }),
    {
      name: 'auth-storage', // unique name for localStorage key
    }
  )
)
