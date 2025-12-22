import { useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { settingsAtom } from '@/state/atoms/settings.ts'
import { useAuth } from '@/hooks/useAuth.ts'
import { Button } from '@/features/ui/components/Button.tsx'
import mascotsImage from '@/assets/pets/mascots.png'

export const LandingPage = () => {
  const navigate = useNavigate()
  const settings = useAtomValue(settingsAtom)
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/', { replace: true })
  }

  useEffect(() => {
    if (settings.onboardingCompletedAt) {
      navigate('/goals', { replace: true })
    }
  }, [navigate, settings.onboardingCompletedAt])

  return (
    <div className="flex min-h-screen flex-col items-center bg-mint-50 pb-8 md:pb-12 lg:pb-16 pt-8 md:pt-12 lg:pt-16">
      {/* Logout button in top right */}
      <div className="w-full max-w-sm px-4 md:px-6 lg:px-8 mx-auto mb-4 flex justify-end">
        <button
          onClick={handleLogout}
          className="text-sm text-font-muted hover:text-peach-200 transition-colors underline"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-1 w-full max-w-sm flex-col items-center justify-center gap-6 md:gap-8 lg:gap-10 text-center px-4 md:px-6 lg:px-8 mx-auto">
        <div className="h-40 md:h-48 lg:h-56 w-full rounded-3xl overflow-hidden shadow-soft">
          <img
            src={mascotsImage}
            alt="Stasik and Koshara mascots"
            className="h-full w-full object-contain"
          />
        </div>
        <div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-peach-200">Lazy Busters</h1>
          <p className="mt-2 md:mt-4 lg:mt-6 text-sm md:text-base lg:text-lg text-font-muted">Beat laziness and grow your own pet habit buddy!</p>
        </div>
      </div>
      <div className="w-full max-w-sm px-4 md:px-6 lg:px-8 mx-auto">
        <Button fullWidth className="text-base md:text-lg lg:text-xl" onClick={() => navigate('/story')}>
          Let&apos;s go
        </Button>
      </div>
    </div>
  )
}
