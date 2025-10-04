interface ProceedButtonProps {
  onClick: () => void
  error?: string
}

export default function ProceedButton({ onClick, error }: ProceedButtonProps) {
  return (
    <div className="mx-auto max-w-56">
      <button 
        onClick={onClick}
        className="flex w-full items-center justify-start gap-3 rounded-full bg-gradient-to-r from-[#c3d6cf] via-[#c3d6cf]/20 to-transparent p-0.5 text-white font-medium text-sm transition-all hover:opacity-90 cursor-pointer"
      >
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
      {error && (
        <p className="mt-2 text-center text-red-300 text-sm">{error}</p>
      )}
    </div>
  )
}
