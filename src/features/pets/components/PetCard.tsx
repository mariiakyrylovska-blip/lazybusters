import { useState } from 'react'
import type { PetInfo } from '@/types/pet.ts'
import { Button } from '@/features/ui/components/Button.tsx'
import { Confetti } from './Confetti.tsx'

interface PetCardProps {
  pet: PetInfo
  onSelect?: (pet: PetInfo) => void
  selected?: boolean
  buttonLabel?: string
  isSmallButton?: boolean
}

export const PetCard = ({ pet, onSelect, selected, buttonLabel, isSmallButton }: PetCardProps) => {
  const [showConfetti, setShowConfetti] = useState(false)

  const handleSelect = (pet: PetInfo) => {
    setShowConfetti(true)
    onSelect?.(pet)
  }

  return (
    <div className="app-card flex flex-col items-center gap-2 text-center px-4 py-3 relative">
      <Confetti isActive={showConfetti} />
      <div
        className="relative w-full h-24 flex items-center justify-center"
        style={{ width: '160px' }}
      >
        <img
          src={pet.id === 'arlo' ? `${import.meta.env.BASE_URL}deer.png` : pet.id === 'sasa' ? `${import.meta.env.BASE_URL}9120.png` : pet.id === 'luma' ? `${import.meta.env.BASE_URL}9118.png` : pet.id === 'koshara' ? `${import.meta.env.BASE_URL}koshara.png` : pet.id === 'stasik' ? `${import.meta.env.BASE_URL}stasik.png` : pet.asset}
          alt={pet.name}
          className="h-24 w-24 object-contain"
        />
      </div>
      <div>
        <h3 className="font-display text-lg text-font-primary">
          {pet.name} {pet.emoji}
        </h3>
        <p className="mt-1 text-xs text-font-muted">{pet.description}</p>
      </div>
      {onSelect && (
        <Button
          type="button"
          onClick={() => handleSelect(pet)}
          className={pet.id === 'arlo' ? "px-3 py-2 text-sm" : isSmallButton ? "px-4 py-2 text-sm" : "px-6 py-2 text-sm"}
        >
          {buttonLabel || (selected ? 'Choose me!' : 'Pick me!')}
        </Button>
      )}
    </div>
  )
}
