import type { ReactNode } from 'react'
import { ErrorBoundary } from './ErrorBoundary.tsx'
import { ThemeProvider } from './ThemeProvider.tsx'
import { useAppHydration } from '@/hooks/useAppHydration.ts'
import { useMidnightReset } from '@/hooks/useMidnightReset.ts'
import { FullscreenLoader } from '@/features/ui/components/FullscreenLoader.tsx'

interface AppProvidersProps {
  children: ReactNode
}

const HydrationGate = ({ children }: { children: ReactNode }) => {
  const hydrated = useAppHydration()
  useMidnightReset()

  if (!hydrated) {
    return <FullscreenLoader message="Waking up Stasik and Koshara..." />
  }

  return <>{children}</>
}

export const AppProviders = ({ children }: AppProvidersProps) => (
  <ThemeProvider>
    <ErrorBoundary>
      <HydrationGate>{children}</HydrationGate>
    </ErrorBoundary>
  </ThemeProvider>
)
