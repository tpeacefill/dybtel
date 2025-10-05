interface CurvedSectionProps {
  children: React.ReactNode
  backgroundColor?: string
  curveHeight?: number
  className?: string
}

export default function CurvedSection({ 
  children, 
  backgroundColor = '#2caf51',
  curveHeight = 120,
  className = ''
}: CurvedSectionProps) {
  return (
    <div className={`relative w-full overflow-x-hidden ${className}`}>
      {/* SVG curved section */}
      <svg
        className="w-full"
        viewBox={`0 0 100 ${curveHeight}`}
        preserveAspectRatio="none"
        style={{ height: `${curveHeight}px`, backgroundColor }}
      >
        <path
          d={`M 0,${curveHeight} Q 50,0 100,${curveHeight} L 100,0 L 0,0 Z`}
          fill="white"
        />
      </svg>
      
      {/* Content container with overlap */}
      <div className="px-4 pt-8 pb-20 bg-gradient-to-b from-primary to-[#29664f] -mt-10 sm:-mt-8">
        {children}
      </div>
    </div>
  )
}
