import { useEffect } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/features/ui/components/Button.tsx'
import { petCatalog } from '@/types/pet.ts'
import { markFailScreenSeenAtom, settingsAtom } from '@/state/atoms/settings.ts'

export const FailPage = () => {
  const navigate = useNavigate()
  const settings = useAtomValue(settingsAtom)
  const pet = petCatalog[settings.currentPet]
  const markSeen = useSetAtom(markFailScreenSeenAtom)

  useEffect(() => {
    void markSeen()
  }, [markSeen])

  return (
    <div className="flex min-h-screen flex-col items-center bg-mint-50 pb-16">
      <div className="w-full max-w-md px-4 md:px-6 lg:px-8 pt-10 mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-fog-50 to-mint-100/60 pb-16 pt-20 text-center shadow-card">
          <span className="absolute left-1/2 top-6 -translate-x-1/2 text-6xl" aria-hidden>
            {pet.emoji}
          </span>
          <p className="font-display text-4xl text-font-primary">It&apos;s okay!</p>
          <p className="mt-4 text-base text-font-muted">Looks like you did not do your task 🐾</p>
          <p className="mt-6 px-6 text-base text-font-primary">
            Don&apos;t worry! {pet.name} and your royal helpers still believe in you.
          </p>
        </div>
      </div>
      <div className="mt-10 w-full max-w-md px-4 md:px-6 lg:px-8 mx-auto">
        <Button fullWidth className="text-xl" onClick={() => navigate('/tasks/new')}>
          Plan your next day ☀️
        </Button>
        <Button
          fullWidth
          variant="ghost"
          className="mt-3 text-base"
          onClick={() => navigate('/goals', { replace: true })}
        >
          Back to goals
        </Button>
      </div>
    </div>
  )
}
