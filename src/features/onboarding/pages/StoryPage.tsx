import { useNavigate } from 'react-router-dom'
import { Button } from '@/features/ui/components/Button.tsx'
import stasikImage from '@/assets/pets/stasik.png'
import kosharaImage from '@/assets/pets/koshara.png'

export const StoryPage = () => {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col items-center bg-mint-100/20 pb-8 md:pb-12 lg:pb-16 pt-8 md:pt-12 lg:pt-16">
      <div className="flex flex-1 w-full max-w-sm flex-col items-center justify-center gap-6 md:gap-8 lg:gap-10 text-center px-4 md:px-6 lg:px-8 mx-auto">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-peach-200">Meet your helpers!</h1>
        <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-6">
          <div className="app-card flex flex-col items-center gap-2 md:gap-3">
            <img
              src={stasikImage}
              alt="Stasik"
              className="h-24 md:h-28 lg:h-32 w-24 md:w-28 lg:w-32 rounded-2xl object-contain"
            />
            <p className="font-display text-lg md:text-xl lg:text-2xl">Stasik</p>
          </div>
          <div className="app-card flex flex-col items-center gap-2 md:gap-3">
            <img
              src={kosharaImage}
              alt="Koshara"
              className="h-24 md:h-28 lg:h-32 w-24 md:w-28 lg:w-32 rounded-2xl object-contain"
            />
            <p className="font-display text-lg md:text-xl lg:text-2xl">Koshara</p>
          </div>
        </div>
        <p className="text-xs md:text-sm lg:text-base text-font-muted">
          Stasik and Koshara are the real pets of the creator—now crowned as kings to make building
          habits more fun!
        </p>
      </div>
      <div className="w-full max-w-sm px-4 md:px-6 lg:px-8 mx-auto">
        <Button fullWidth className="text-base md:text-lg lg:text-xl" onClick={() => navigate('/choose')}>
          Next
        </Button>
      </div>
    </div>
  )
}
