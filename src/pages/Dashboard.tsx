import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import FormField from '../components/FormField'
import ProfileAvatar from '../components/ProfileAvatar'
import TopUpAmountButton from '../components/TopUpAmountButton'
import ProceedButton from '../components/ProceedButton'
import profileImage from '../assets/Image1.png'
import { useBalance } from '../hooks/useBalance'
import { useProfileRotation } from '../hooks/useProfileRotation'
import { useFormField } from '../hooks/useFormField'
import { PROFILE_CONFIGS, QUICK_AMOUNTS } from '../constants/dashboard'

export default function Dashboard() {
  const navigate = useNavigate()
  const { formattedBalance } = useBalance()
  const activeProfile = useProfileRotation()
  
  // Error state for validation
  const [error, setError] = useState('')
  
  // Use custom hook for form field
  const customAmountField = useFormField({
    errors: { customAmount: error },
    setErrors: (newErrors) => setError((newErrors as { customAmount?: string }).customAmount || ''),
    fieldName: 'customAmount'
  })

  // Handle proceed to payment
  const handleProceedToPayment = () => {
    const schema = z.string().min(1, 'Please select or enter an amount')
    const result = schema.safeParse(customAmountField.value)
    
    if (!result.success) {
      setError(result.error.issues[0].message)
      return
    }
    
    setError('')
    // Navigate to TopUp with the selected amount
    navigate(`/topup?amount=${customAmountField.value}`)
  }

  return (
    <div className="relative min-h-screen bg-white">

      {/* Header row (icons) - Full width */}
      <div className="w-full bg-white px-6 pt-8">
        <div className="flex items-center justify-end gap-4 text-gray-400">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clipRule="evenodd" />
            </svg>
            <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
        </div>
      </div>

      {/* Profile section */}
      <ProfileAvatar
        profiles={PROFILE_CONFIGS}
        activeProfile={activeProfile}
        profileImage={profileImage}
        userName="Kofi Johnson"
      />

      {/* Green gradient section with convex curve */}
      <div className="relative w-full bg-gradient-to-b from-[#70d490] via-[#69b88c] to-[#2e5e54] pb-20 -mt-8">
        {/* SVG curved top */}
        <svg
          className="absolute top-0 left-0 w-full"
          viewBox="0 0 375 100"
          preserveAspectRatio="none"
          style={{ height: '100px' }}
        >
          <path
            d="M 0,0 Q 187.5,100 375,0 L 375,0 L 0,0 Z"
            fill="white"
          />
        </svg>
        {/* Content container */}
        <div className="relative mx-auto max-w-md pt-20">
        {/* Balance section */}
        <div className="px-6 text-center text-white">
          <p className="text-sm/6 opacity-70">Current Balance</p>
          <p className="text-3xl font-extrabold tracking-wide text-[#215449]">GHC {formattedBalance}</p>
        </div>

        {/* Top Up quick amounts */}
        <div className="mt-6 px-4">
          <p className="text-center text-white/90 font-medium">Top Up</p>
          <div className="mt-4 relative rounded-t-3xl p-3">
            <div className="absolute inset-0 rounded-t-3xl border-t border-l border-r border-white/40 pointer-events-none" style={{ WebkitMaskImage: 'linear-gradient(to bottom, white 0%, white 5%, transparent 70%)', maskImage: 'linear-gradient(to bottom, white 0%, white 5%, transparent 70%)' }}></div>
            <div className="grid grid-cols-4 gap-3">
              {QUICK_AMOUNTS.map((amt) => (
                <TopUpAmountButton
                  key={amt}
                  amount={amt}
                  onClick={() => customAmountField.setValue(amt)}
                />
              ))}
            </div>
            
            {/* Custom amount */}
            <div className="mt-4 px-2">
              <div className="mx-auto max-w-56">
                <FormField
                  id="custom-amount"
                  label="Custom Amount"
                  type="number"
                  value={customAmountField.value}
                  onChange={customAmountField.handleChange}
                  error={customAmountField.error}
                  className="text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Proceed button */}
        <div className="mt-6 px-1">
          <ProceedButton 
            onClick={handleProceedToPayment}
          />
        </div>

        {/* Activity history link */}
        <div className="mt-6 pb-8 text-center text-white/90">
          <button 
            onClick={() => navigate('/activity-history')}
            className="inline-flex items-center gap-2 underline-offset-4 hover:underline cursor-pointer"
          >
            View activity history 
            <div className="flex h-3 w-3 items-center justify-center rounded-full bg-[#d9d9d9]">
              <svg className="h-3 w-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </button>
        </div>
        </div>
      </div>
    </div>
  )
}