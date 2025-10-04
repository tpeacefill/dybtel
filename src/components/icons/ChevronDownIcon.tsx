interface ChevronDownIconProps {
  className?: string
  strokeWidth?: number
}

export default function ChevronDownIcon({ 
  className = "h-8 w-8", 
  strokeWidth = 1.6 
}: ChevronDownIconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}
