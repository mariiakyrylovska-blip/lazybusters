import { useState } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { petCatalog, type PetId } from '@/types/pet.ts'
import { Button } from '@/features/ui/components/Button.tsx'
import { PetCard } from '@/features/pets/components/PetCard.tsx'
import { markOnboardingCompleteAtom, setCurrentPetAtom, settingsAtom } from '@/state/atoms/settings.ts'

const petList = Object.values(petCatalog).filter((pet) => pet.id !== 'koshara')

export const ChoosePetPage = () => {
  const navigate = useNavigate()
  const settings = useAtomValue(settingsAtom)
  const [selected, setSelected] = useState<PetId>(settings.currentPet)
  const setCurrentPet = useSetAtom(setCurrentPetAtom)
  const markOnboardingComplete = useSetAtom(markOnboardingCompleteAtom)

  const handleSelectPet = async (petId: PetId) => {
    setSelected(petId)
    await setCurrentPet(petId)
    await markOnboardingComplete()
    navigate('/empty-goals', { replace: true })
  }

  return (
    <div className="flex flex-col min-h-screen bg-mint-100 w-full py-6 md:py-8 lg:py-10">
      <div className="w-full text-center px-4 md:px-6 lg:px-8 mx-auto max-w-md">
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-peach-200">Choose your lazy buster</h1>
        <p className="mt-2 text-xs md:text-sm lg:text-base text-font-primary">Choose one that reflects you the most</p>
      </div>
      <div className="flex-1 w-full flex flex-col justify-center items-center px-4 md:px-6 lg:px-8">
        <div className="flex flex-col gap-3 md:gap-4 lg:gap-6 w-full max-w-md mx-auto">
          <div className="flex justify-center">
            <div className="w-32 md:w-40 lg:w-48">
              <PetCard
                pet={petList[0]}
                onSelect={() => handleSelectPet(petList[0].id)}
                selected={selected === petList[0].id}
                buttonLabel="Choose me!"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-6 w-full">
            {petList.slice(1).map((pet) => (
              <div key={pet.id} className="w-full flex justify-center">
                <div className="w-32 md:w-40 lg:w-48">
                  <PetCard
                    pet={pet}
                    onSelect={() => handleSelectPet(pet.id)}
                    selected={selected === pet.id}
                    buttonLabel="Choose me!"
                    isSmallButton
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full max-w-md mt-6 md:mt-8 lg:mt-10 px-4 md:px-6 lg:px-8 mx-auto">
        <Button fullWidth className="text-lg md:text-xl lg:text-2xl" onClick={() => navigate('/story')}>
          Back
        </Button>
      </div>
    </div>
  )
}
