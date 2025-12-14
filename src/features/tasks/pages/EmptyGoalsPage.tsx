import { useAtomValue } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { petCatalog } from '@/types/pet.ts'
import { Button } from '@/features/ui/components/Button.tsx'
import { settingsAtom } from '@/state/atoms/settings.ts'

export const EmptyGoalsPage = () => {
  const navigate = useNavigate()
  const settings = useAtomValue(settingsAtom)
  const pet = petCatalog[settings.currentPet]

  return (
    <div className="flex min-h-screen flex-col bg-mint-50 pb-16">
      <div className="flex-1 bg-gradient-to-b from-fog-50 to-mint-100/60">
        <div className="flex flex-col items-center gap-6 px-4 md:px-6 lg:px-8 pt-8 mx-auto max-w-md">
          <div className="relative w-full overflow-hidden rounded-3xl bg-peach-50 shadow-soft">
            <div className="flex h-64 flex-col items-center justify-center gap-3" style={
              pet.id === 'arlo'
                ? { backgroundImage: `url(${import.meta.env.BASE_URL}bb-bg.png)`, backgroundSize: 'cover', backgroundPosition: 'center' }
                : pet.id === 'sasa'
                ? { backgroundImage: `url(${import.meta.env.BASE_URL}d2-bg.png)`, backgroundSize: 'cover', backgroundPosition: 'center' }
                : pet.id === 'luma'
                ? { backgroundImage: `url(${import.meta.env.BASE_URL}d6-bg.png)`, backgroundSize: 'cover', backgroundPosition: 'center' }
                : {}
            }>
              <img
                src={pet.id === 'arlo' ? `${import.meta.env.BASE_URL}9119.png` : pet.id === 'sasa' ? `${import.meta.env.BASE_URL}9120.png` : pet.id === 'luma' ? `${import.meta.env.BASE_URL}9118.png` : pet.id === 'koshara' ? `${import.meta.env.BASE_URL}koshara.png` : pet.id === 'stasik' ? `${import.meta.env.BASE_URL}stasik.png` : ''}
                alt={pet.name}
                className="h-40 w-40 object-contain"
              />
            </div>
          </div>
          <div className="w-full text-center">
            <p className="font-display text-2xl text-font-primary">No goals yet!</p>
            <p className="mt-4 text-4xl">⬇️</p>
            <p className="mt-2 text-font-muted">Tap below to plan your comfort routine.</p>
          </div>
        </div>
      </div>
      <div className="mt-6 w-full max-w-md px-4 md:px-6 lg:px-8 mx-auto">
        <Button fullWidth className="text-xl" onClick={() => navigate('/tasks/new')}>
          Add something
        </Button>
      </div>
    </div>
  )
}

