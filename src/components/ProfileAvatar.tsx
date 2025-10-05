import { useState, useEffect } from 'react'

interface ProfileAvatarProps {
  profiles: readonly { readonly color: string; readonly type: string; readonly image: string }[]
  activeProfile: number
  userName: string
}

export default function ProfileAvatar({ 
  profiles, 
  activeProfile, 
  userName 
}: ProfileAvatarProps) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())

  // Preload all profile images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = profiles.map((profile) => {
        return new Promise<string>((resolve, reject) => {
          const img = new Image()
          img.onload = () => {
            setLoadedImages(prev => new Set([...prev, profile.image]))
            resolve(profile.image)
          }
          img.onerror = reject
          img.src = profile.image
        })
      })

      try {
        await Promise.all(imagePromises)
      } catch (error) {
        console.warn('Some images failed to preload:', error)
      }
    }

    preloadImages()
  }, [profiles])

  return (
    <div className="relative z-10 mx-auto max-w-md lg:max-w-lg xl:max-w-xl px-6">
      {/* Avatar + arc (simple accent) */}
      <div className="mt-4 flex items-center justify-center gap-4 relative h-64 overflow-hidden">
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
              } ${isLeft ? 'z-10 -translate-x-32 sm:-translate-x-44' : ''} ${
                isRight ? 'z-10 translate-x-32 sm:translate-x-44' : ''
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
                {loadedImages.has(profile.image) ? (
                  <img
                    src={profile.image}
                    alt="Profile"
                    className="h-40 w-40 rounded-full object-cover"
                    loading="eager"
                    decoding="sync"
                  />
                ) : (
                  <div className="h-40 w-40 rounded-full bg-gray-200 animate-pulse flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gray-300"></div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <p className="text-center text-xl font-semibold text-gray-600">{userName}</p>
    </div>
  )
}
