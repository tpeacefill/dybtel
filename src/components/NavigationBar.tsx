interface NavigationBarProps {
  onBack: () => void
  backText?: string
  showIcons?: boolean
}

export default function NavigationBar({ 
  onBack, 
  backText = "Back to Dashboard",
  showIcons = true 
}: NavigationBarProps) {
  return (
    <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
      <button 
        onClick={onBack}
        className="flex items-center gap-1 sm:gap-2 cursor-pointer"
      >
        <svg className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l-7 7 7 7" />
        </svg>
        <span className="text-green-600 font-light text-sm sm:text-base">{backText}</span>
      </button>
      
      {showIcons && (
        <div className="flex items-center gap-4 text-gray-400">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clipRule="evenodd" />
          </svg>
          <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      )}
    </div>
  )
}
