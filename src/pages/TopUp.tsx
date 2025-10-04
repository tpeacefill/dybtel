import { useState, useEffect } from 'react'
import { z } from 'zod'
import { useNavigate, useSearchParams } from 'react-router-dom'
import worldMap from '../assets/world-map.svg'
import FormField from '../components/FormField'
import PrimaryButton from '../components/PrimaryButton'
import { useAuthStore } from '../store/authStore'
import { useTransactionStore } from '../store/transactionStore'

export default function TopUp({ onBackToLogin }: { onBackToLogin?: () => void }) {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [amount, setAmount] = useState('')
  const [wardSerialId, setWardSerialId] = useState('')
  const [errors, setErrors] = useState<{ 
    email?: string; 
    phone?: string; 
    amount?: string; 
    wardSerialId?: string 
  }>({})
  const { email: storedEmail, logout } = useAuthStore()
  const { addTransaction } = useTransactionStore()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // Prefill email from store and amount from URL when component mounts
  useEffect(() => {
    if (storedEmail) {
      setEmail(storedEmail)
    }
    const amountFromUrl = searchParams.get('amount')
    if (amountFromUrl) {
      setAmount(amountFromUrl)
    }
  }, [storedEmail, searchParams])

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10) // Only numbers, max 10 digits
    setPhone(value)
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }))
  }

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(e.target.value)
    if (errors.amount) setErrors((prev) => ({ ...prev, amount: undefined }))
  }

  function handleWardSerialIdChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/\D/g, '').slice(0, 3) // Only numbers, max 3 digits
    setWardSerialId(value)
    if (errors.wardSerialId) setErrors((prev) => ({ ...prev, wardSerialId: undefined }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const schema = z.object({
      email: z.string().min(1, 'Email is required').email('Enter a valid email'),
      phone: z.string().min(1, 'Phone number is required').length(10, 'Phone number must be exactly 10 digits'),
      amount: z.string().min(1, 'Amount is required').refine((val) => {
        const num = parseFloat(val)
        return !isNaN(num) && num > 0
      }, 'Amount must be a valid positive number'),
      wardSerialId: z.string().min(1, 'Ward Serial ID is required').length(3, 'Ward Serial ID must be exactly 3 digits').refine((val) => {
        const num = parseInt(val, 10)
        return num >= 1 && num <= 20
      }, 'Ward Serial ID must be between 001 and 020'),
    })

    const result = schema.safeParse({ email, phone, amount, wardSerialId })
    if (!result.success) {
      const fieldErrors: { 
        email?: string; 
        phone?: string; 
        amount?: string; 
        wardSerialId?: string 
      } = {}
      for (const issue of result.error.issues) {
        if (issue.path[0] === 'email') fieldErrors.email = issue.message
        if (issue.path[0] === 'phone') fieldErrors.phone = issue.message
        if (issue.path[0] === 'amount') fieldErrors.amount = issue.message
        if (issue.path[0] === 'wardSerialId') fieldErrors.wardSerialId = issue.message
      }
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    // Save transaction data and navigate to ActivityHistory
    addTransaction({
      email,
      phone,
      amount,
      wardSerialId
    })
    navigate('/activity-history')
  }

  return (
    <div className="relative min-h-screen bg-[#67b58d]">
      <img src={worldMap} alt="World map" className="pointer-events-none absolute inset-0 h-full w-full object-cover" />

      {/* Form area: mobile = bottom sheet; desktop = centered card */}
      <div className="absolute bottom-4 left-0 right-0 z-10 rounded-[48px] bg-[#ededed] px-6 pt-12 pb-24 shadow-[0_-12px_28px_rgba(0,0,0,0.12)] lg:static lg:bg-transparent lg:p-0 lg:shadow-none lg:flex lg:min-h-screen lg:items-center lg:justify-center">
        <div className="relative z-20 mx-auto w-full max-w-sm lg:rounded-2xl lg:bg-[#ededed] lg:p-8 lg:shadow-xl">
          {/* Back button */}
          <button 
            onClick={() => {
              logout()
              onBackToLogin?.()
            }}
            className="mb-4 flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            Back to Login
          </button>

          <h2 className="text-2xl font-semibold text-primary">Top Up</h2>
          <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
            <FormField
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              error={errors.email}
              disabled={true}
            />
            <FormField
              id="phone"
              label="Phone"
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              error={errors.phone}
              placeholder="0277324365"
            />
            <FormField
              id="amount"
              label="Amount"
              type="number"
              value={amount}
              onChange={handleAmountChange}
              error={errors.amount}
            />
            <div>
              <label htmlFor="wardSerialId" className="block text-xs font-medium text-gray-500">Ward Serial ID</label>
              <div className={`mt-2 flex rounded-xl border ${errors.wardSerialId ? 'border-red-500' : 'border-gray-300'} bg-white overflow-hidden`}>
                <input
                  id="wardSerialId"
                  type="text"
                  value={wardSerialId}
                  onChange={handleWardSerialIdChange}
                  placeholder="001"
                  className="flex-1 px-4 py-3 outline-none ring-primary focus:ring-1 focus:border-primary"
                  aria-invalid={Boolean(errors.wardSerialId)}
                  aria-describedby={errors.wardSerialId ? 'wardSerialId-error' : undefined}
                />
                <button
                  type="button"
                  className="px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
                  onClick={() => {
                    const currentValue = wardSerialId ? parseInt(wardSerialId, 10) : 0
                    const newValue = currentValue + 1
                    if (newValue <= 20) {
                      setWardSerialId(newValue.toString().padStart(3, '0'))
                      if (errors.wardSerialId) setErrors((prev) => ({ ...prev, wardSerialId: undefined }))
                    }
                  }}
                >
                  <svg 
                    className="w-5 h-5 text-gray-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
                    />
                  </svg>
                </button>
              </div>
              {errors.wardSerialId ? (
                <p id="wardSerialId-error" className="mt-1 text-xs text-red-600">{errors.wardSerialId}</p>
              ) : null}
            </div>
            <PrimaryButton type="submit" className="mt-2">Proceed to Payment</PrimaryButton>
          </form>
        </div>
        {/* Safe area spacer for iOS/Android bottom bars */}
        <div className="h-[env(safe-area-inset-bottom)] lg:hidden" />
      </div>
    </div>
  )
}
