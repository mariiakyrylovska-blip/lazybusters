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
    // Reload the app to trigger auth check in App.tsx
    window.location.href = window.location.pathname
  }

  useEffect(() => {
    if (settings.onboardingCompletedAt) {
      navigate('/goals', { replace: true })
    }
  }, [navigate, settings.onboardingCompletedAt])

  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-[#faf9f7] to-[#f5f1ed] pb-8 md:pb-12 lg:pb-16 pt-6 md:pt-8 lg:pt-10">
      {/* Logout button in top right */}
      <div className="w-full max-w-2xl px-4 md:px-6 lg:px-8 mx-auto flex justify-end">
        <button
          onClick={handleLogout}
          className="text-xs md:text-sm text-[#9b8b7e] hover:text-[#d4a574] transition-colors duration-200 font-medium"
        >
          Logout
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-1 w-full max-w-2xl flex-col items-center justify-center gap-8 md:gap-10 lg:gap-12 text-center px-4 md:px-6 lg:px-8 mx-auto">
        {/* Image */}
        <div className="w-full max-w-sm h-48 md:h-56 lg:h-64 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <img
            src={mascotsImage}
            alt="Stasik and Koshara mascots"
            className="h-full w-full object-contain bg-white"
          />
        </div>

        {/* Text content */}
        <div className="space-y-4 md:space-y-6">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#2d2d2d] leading-tight">
            Lazy Busters
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-[#7c7875] leading-relaxed max-w-md mx-auto font-light">
            Beat laziness and grow your own pet habit buddy!
          </p>
        </div>
      </div>

      {/* Button */}
      <div className="w-full max-w-2xl px-4 md:px-6 lg:px-8 mx-auto">
        <Button
          fullWidth
          className="text-base md:text-lg lg:text-xl bg-[#d4a574] hover:bg-[#c89560] text-white font-semibold py-3 md:py-4 rounded-xl transition-colors duration-200"
          onClick={() => navigate('/story')}
        >
          Let&apos;s go
        </Button>
      </div>
    </div>
  )
}
