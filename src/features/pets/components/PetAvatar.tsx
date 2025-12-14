import { useState } from 'react'
import { clsx } from 'clsx'
import type { PetInfo } from '@/types/pet.ts'

interface PetAvatarProps {
  pet: PetInfo
  size?: 'sm' | 'md' | 'lg'
  withCrown?: boolean
}

const sizeClasses: Record<NonNullable<PetAvatarProps['size']>, string> = {
  sm: 'h-20 w-20',
  md: 'h-28 w-28',
  lg: 'h-36 w-36',
}

export const PetAvatar = ({ pet, size = 'md', withCrown }: PetAvatarProps) => {
  const [errored, setErrored] = useState(false)

  return (
    <div className="relative flex flex-col items-center">
      {withCrown && (
        <span className="absolute -top-6 text-3xl drop-shadow-sm" aria-hidden>
          👑
        </span>
      )}
      <div
        className={clsx(
          'flex items-center justify-center overflow-hidden rounded-full border-4 border-peach-100 bg-fog-50 shadow-soft',
          sizeClasses[size],
        )}
      >
        {!errored ? (
          <img
            src={pet.getImagePath ? pet.getImagePath() : pet.asset}
            alt={`${pet.name} illustration`}
            className="h-full w-full object-cover"
            onError={() => setErrored(true)}
          />
        ) : (
          <span className="text-5xl" aria-hidden>
            {pet.emoji}
          </span>
        )}
      </div>
    </div>
  )
}
