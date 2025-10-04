import { useState } from 'react'
import { z } from 'zod'
import worldMap from '../assets/world-map.svg'
import FormField from '../components/FormField'
import PrimaryButton from '../components/PrimaryButton'

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

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPhone(e.target.value)
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }))
  }

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(e.target.value)
    if (errors.amount) setErrors((prev) => ({ ...prev, amount: undefined }))
  }

  function handleWardSerialIdChange(e: React.ChangeEvent<HTMLInputElement>) {
    setWardSerialId(e.target.value)
    if (errors.wardSerialId) setErrors((prev) => ({ ...prev, wardSerialId: undefined }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const schema = z.object({
      email: z.string().min(1, 'Email is required').email('Enter a valid email'),
      phone: z.string().min(1, 'Phone number is required').min(10, 'Phone number must be at least 10 digits'),
      amount: z.string().min(1, 'Amount is required').refine((val) => {
        const num = parseFloat(val)
        return !isNaN(num) && num > 0
      }, 'Amount must be a valid positive number'),
      wardSerialId: z.string().min(1, 'Ward Serial ID is required'),
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
    // TODO: integrate with payment processing
    console.log('Proceeding to payment with:', { email, phone, amount, wardSerialId })
  }

  return (
    <div className="relative min-h-screen bg-[#67b58d]">
      <img src={worldMap} alt="World map" className="pointer-events-none absolute inset-0 h-full w-full object-cover" />

      {/* Form area: mobile = bottom sheet; desktop = centered card */}
      <div className="absolute bottom-4 left-0 right-0 z-10 rounded-[48px] bg-[#ededed] px-6 pt-12 pb-24 shadow-[0_-12px_28px_rgba(0,0,0,0.12)] lg:static lg:bg-transparent lg:p-0 lg:shadow-none lg:flex lg:min-h-screen lg:items-center lg:justify-center">
        <div className="relative z-20 mx-auto w-full max-w-sm lg:rounded-2xl lg:bg-[#ededed] lg:p-8 lg:shadow-xl">
          {/* Back button */}
          <button 
            onClick={onBackToLogin}
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
                d="M15 19l-7-7 7-7" 
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
            />
            <FormField
              id="phone"
              label="Phone"
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              error={errors.phone}
            />
            <FormField
              id="amount"
              label="Amount"
              type="number"
              value={amount}
              onChange={handleAmountChange}
              error={errors.amount}
            />
            <FormField
              id="wardSerialId"
              label="Ward Serial ID"
              type="text"
              value={wardSerialId}
              onChange={handleWardSerialIdChange}
              error={errors.wardSerialId}
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
