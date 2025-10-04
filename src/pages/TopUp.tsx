import { useState, useEffect } from 'react'
import { z } from 'zod'
import { useNavigate, useSearchParams } from 'react-router-dom'
import worldMap from '../assets/world-map.svg'
import FormField from '../components/FormField'
import PrimaryButton from '../components/PrimaryButton'
import WardSerialIdField from '../components/WardSerialIdField'
import { useAuthStore } from '../store/authStore'
import { useTransactionStore } from '../store/transactionStore'
import { useFormField } from '../hooks/useFormField'

export default function TopUp({ onBackToLogin }: { onBackToLogin?: () => void }) {
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

  // Use custom hook for form fields
  const emailField = useFormField({
    initialValue: storedEmail || '',
    errors,
    setErrors,
    fieldName: 'email'
  })

  const phoneField = useFormField({
    errors,
    setErrors,
    fieldName: 'phone'
  })

  const amountField = useFormField({
    errors,
    setErrors,
    fieldName: 'amount'
  })

  const wardSerialIdField = useFormField({
    errors,
    setErrors,
    fieldName: 'wardSerialId'
  })

  // Prefill amount from URL when component mounts
  useEffect(() => {
    const amountFromUrl = searchParams.get('amount')
    if (amountFromUrl) {
      amountField.setValue(amountFromUrl)
    }
  }, [searchParams, amountField])

  // Determine where user came from based on URL parameters
  const cameFromDashboard = searchParams.get('amount') !== null
  const backButtonText = cameFromDashboard ? 'Back to Dashboard' : 'Back to Login'
  const backButtonAction = cameFromDashboard ? () => navigate('/dashboard') : () => {
    logout()
    onBackToLogin?.()
  }

  // Custom handlers for special field formatting
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10) // Only numbers, max 10 digits
    phoneField.setValue(value)
    phoneField.clearError()
  }

  const handleWardSerialIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 3) // Only numbers, max 3 digits
    wardSerialIdField.setValue(value)
    wardSerialIdField.clearError()
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

    const result = schema.safeParse({ 
      email: emailField.value, 
      phone: phoneField.value, 
      amount: amountField.value, 
      wardSerialId: wardSerialIdField.value 
    })
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
      email: emailField.value,
      phone: phoneField.value,
      amount: amountField.value,
      wardSerialId: wardSerialIdField.value
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
            onClick={backButtonAction}
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
            {backButtonText}
          </button>

          <h2 className="text-2xl font-semibold text-primary">Top Up</h2>
          <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
            <FormField
              id="email"
              label="Email"
              type="email"
              value={emailField.value}
              onChange={emailField.handleChange}
              error={emailField.error}
              disabled={true}
            />
            <FormField
              id="phone"
              label="Phone"
              type="tel"
              value={phoneField.value}
              onChange={handlePhoneChange}
              error={phoneField.error}
              placeholder="0277324365"
            />
            <FormField
              id="amount"
              label="Amount"
              type="number"
              value={amountField.value}
              onChange={amountField.handleChange}
              error={amountField.error}
            />
            <WardSerialIdField
              value={wardSerialIdField.value}
              onChange={handleWardSerialIdChange}
              onIncrement={() => {
                const currentValue = wardSerialIdField.value ? parseInt(wardSerialIdField.value, 10) : 0
                const newValue = currentValue + 1
                if (newValue <= 20) {
                  wardSerialIdField.setValue(newValue.toString().padStart(3, '0'))
                  wardSerialIdField.clearError()
                }
              }}
              error={wardSerialIdField.error}
            />
            <PrimaryButton type="submit" className="mt-2">Proceed to Payment</PrimaryButton>
          </form>
        </div>
        {/* Safe area spacer for iOS/Android bottom bars */}
        <div className="h-[env(safe-area-inset-bottom)] lg:hidden" />
      </div>
    </div>
  )
}
