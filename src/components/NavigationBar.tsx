import NotificationBellIcon from './icons/NotificationBellIcon'
import ChevronDownIcon from './icons/ChevronDownIcon'

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
          <NotificationBellIcon />
          <ChevronDownIcon />
        </div>
      )}
    </div>
  )
}