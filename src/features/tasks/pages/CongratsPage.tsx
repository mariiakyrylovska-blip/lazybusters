import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/features/ui/components/Button.tsx'
import { petCatalog } from '@/types/pet.ts'

export const CongratsPage = () => {
  const navigate = useNavigate()
  const [affirmationIndex, setAffirmationIndex] = useState(0)

  // Показываем разных питомцев в зависимости от количества завершений в день
  const today = new Date().toDateString()
  const completionCountKey = `completions_${today}`
  const completionCount = parseInt(localStorage.getItem(completionCountKey) || '0', 10)

  // Увеличиваем счетчик
  localStorage.setItem(completionCountKey, String(completionCount + 1))

  const celebrationPetId = completionCount % 2 === 0 ? 'koshara' : 'sasa'
  const celebrationPet = petCatalog[celebrationPetId]

  const affirmations = celebrationPet.affirmations
  const affirmation = affirmations[affirmationIndex % affirmations.length]

  const handleCardClick = () => {
    setAffirmationIndex((prev) => prev + 1)
  }

  const getPetImage = (petId: string) => {
    if (petId === 'sasa') return '/stasik.png'
    if (petId === 'koshara') return '/koshara.png'
    return '/9119.png'
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-mint-50 pb-8 md:pb-12 lg:pb-16 pt-8 md:pt-12 lg:pt-16">
      <div className="w-full max-w-sm px-4 md:px-6 lg:px-8 mx-auto">
        <div
          className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-peach-100 to-peach-50 pb-8 md:pb-12 lg:pb-16 pt-12 md:pt-16 lg:pt-20 text-center shadow-card cursor-pointer transition-transform hover:scale-105"
          onClick={handleCardClick}
        >
          <div className="flex flex-col items-center gap-3 md:gap-4 lg:gap-6">
            <img
              src={getPetImage(celebrationPet.id)}
              alt={celebrationPet.name}
              className="h-24 md:h-28 lg:h-32 w-24 md:w-28 lg:w-32 object-contain"
            />
            <p className="font-display text-3xl md:text-4xl lg:text-5xl text-font-primary">Well done!</p>
            <p className="text-base md:text-lg lg:text-xl text-font-muted">
              {celebrationPetId === 'sasa' ? 'Stasik is so proud of you! 🐹' : 'Koshara is so proud of you! 🐱'}
            </p>
            <div className="flex flex-col items-center gap-1">
              <p className="px-4 md:px-6 text-sm md:text-base lg:text-lg italic text-font-primary">"{affirmation}"</p>
              <p className="text-base md:text-lg lg:text-xl leading-none">⬆️</p>
              <p className="px-4 md:px-6 text-xs md:text-sm text-font-muted">
                {celebrationPetId === 'sasa' ? 'tap for another squeak of motivation' : 'tap for another meow of motivation'}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-sm px-4 md:px-6 lg:px-8 mx-auto">
        <Button fullWidth className="text-base md:text-lg lg:text-xl" onClick={() => navigate('/tasks/new')}>
          Plan your next day ☀️
        </Button>
      </div>
    </div>
  )
}
