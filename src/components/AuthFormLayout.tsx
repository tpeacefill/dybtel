import worldMap from '../assets/world-map.svg'

interface AuthFormLayoutProps {
  title?: string
  children: React.ReactNode
  backButton?: {
    text: string
    onClick: () => void
  }
  footer?: React.ReactNode
}

export default function AuthFormLayout({ 
  title, 
  children, 
  backButton,
  footer 
}: AuthFormLayoutProps) {
  return (
    <div className="relative min-h-screen bg-[#67b58d]">
      <img 
        src={worldMap} 
        alt="World map" 
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        loading="eager" 
      />

      {/* Form area: mobile = bottom sheet; desktop = centered card */}
      <div className="absolute bottom-4 left-0 right-0 z-10 rounded-[48px] bg-[#ededed] px-6 pt-12 pb-24 shadow-[0_-12px_28px_rgba(0,0,0,0.12)] lg:static lg:bg-transparent lg:p-0 lg:shadow-none lg:flex lg:min-h-screen lg:items-center lg:justify-center">
        <div className="relative z-20 mx-auto w-full max-w-sm lg:rounded-2xl lg:bg-[#ededed] lg:p-8 lg:shadow-xl">
          {/* Back button */}
          {backButton && (
            <button 
              onClick={backButton.onClick}
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
              {backButton.text}
            </button>
          )}

          {title && <h2 className="text-2xl font-semibold text-primary">{title}</h2>}
          {children}
          
          {/* Footer content */}
          {footer && (
            <div className="mt-6">
              {footer}
            </div>
          )}
        </div>
        {/* Safe area spacer for iOS/Android bottom bars */}
        <div className="h-[env(safe-area-inset-bottom)] lg:hidden" />
      </div>
    </div>
  )
}
