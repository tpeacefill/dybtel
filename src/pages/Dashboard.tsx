import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from '../components/FormField'
import profileImage from '../assets/Image1.png'

export default function Dashboard() {
  const [customAmount, setCustomAmount] = useState('')
  const [activeProfile, setActiveProfile] = useState(1) // 0: yellow, 1: red (default center), 2: green
  const navigate = useNavigate()

  // Auto-rotate profiles every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProfile((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const profiles = [
    { color: '#eab308', type: 'half' }, // Yellow
    { color: '#ef4444', type: 'arc' },  // Red
    { color: '#22c55e', type: 'full' }  // Green
  ]

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
      <div className="relative z-10 mx-auto max-w-md px-6">
          {/* Avatar + arc (simple accent) */}
          <div className="mt-4 flex items-center justify-center gap-4 relative h-64">
            {profiles.map((profile, index) => {
              const position = (index - activeProfile + 3) % 3
              const isCenter = position === 1
              const isLeft = position === 0
              const isRight = position === 2
              
              return (
            <div
              key={index}
              className={`absolute transition-all duration-700 ease-in-out ${
                isCenter ? 'z-30 scale-100 opacity-100' : 'scale-75 opacity-60'
              } ${isLeft ? 'z-10 -translate-x-44' : ''} ${
                isRight ? 'z-10 translate-x-44' : ''
              } ${isCenter ? 'translate-x-0' : ''}`}
            >
              <div className="relative">
              <svg className="absolute -inset-6 w-[208px] h-[208px]" viewBox="0 0 208 208">
                <circle
                  cx="104"
                  cy="104"
                  r="93"
                  fill="none"
                  stroke={profile.color}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={
                    profile.type === 'half' ? '292 584' :
                    profile.type === 'arc' ? '135 1000' :
                    undefined
                  }
                  transform={
                    profile.type === 'half' ? 'rotate(90 104 104)' :
                    profile.type === 'arc' ? 'rotate(145 104 104)' :
                    undefined
                  }
                />
              </svg>
               <div
                 className="h-40 w-40 rounded-full bg-[#cdd1d0] flex items-center justify-center"
               >
                   <img
                     src={profileImage}
                     alt="Profile"
                     className="h-32 w-32 rounded-full object-cover"
                   />
               </div>
            </div>
            </div>
              )
            })}
          </div>

          <p className="text-center text-xl font-semibold text-gray-600">Kofi Johnson</p>
      </div>

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
          <p className="text-3xl font-extrabold tracking-wide text-[#215449]">GHC 53.00</p>
        </div>

        {/* Top Up quick amounts */}
        <div className="mt-6 px-4">
          <p className="text-center text-white/90 font-medium">Top Up</p>
          <div className="mt-4 relative rounded-t-3xl p-3">
            <div className="absolute inset-0 rounded-t-3xl border-t border-l border-r border-white/40 pointer-events-none" style={{ WebkitMaskImage: 'linear-gradient(to bottom, white 0%, white 5%, transparent 70%)', maskImage: 'linear-gradient(to bottom, white 0%, white 5%, transparent 70%)' }}></div>
            <div className="grid grid-cols-4 gap-3">
              {['50', '100', '150', '200'].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setCustomAmount(amt)}
                  className="aspect-square w-full rounded-2xl bg-[#7ec492] p-2 sm:p-3 text-center shadow-md ring-1 ring-white/25 backdrop-blur-[1px] border border-white/40 cursor-pointer"
                >
                  <div className="mx-auto flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#205348] text-white text-xs sm:text-base">
                    ¢
                  </div>
                  <div className="mt-1 text-white text-base sm:text-lg font-semibold">{amt}</div>
                </button>
              ))}
            </div>
            
            {/* Custom amount */}
            <div className="mt-4 px-2">
              <div className="mx-auto max-w-56">
                <FormField
                  id="custom-amount"
                  label="Custom Amount"
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Proceed button */}
        <div className="mt-6 px-1">
          <div className="mx-auto max-w-56">
                 <button className="flex w-full items-center justify-start gap-3 rounded-full bg-gradient-to-r from-[#c3d6cf] via-[#c3d6cf]/20 to-transparent p-0.5 text-white font-medium text-sm transition-all hover:opacity-90 cursor-pointer">
               <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#609684]">
                 <svg
                   className="h-5 w-5 text-white"
                   fill="none"
                   stroke="currentColor"
                   strokeWidth={2.2}
                   viewBox="0 0 24 24"
                 >
                   <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                 </svg>
               </div>
               <span className="text-white text-xs font-medium tracking-wide">
                 Proceed to Payment
               </span>
            </button>
          </div>
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