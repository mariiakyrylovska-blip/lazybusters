import { useState, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { AppProviders } from './providers/AppProviders.tsx'
import { createRouter } from './router.tsx'
import { FullscreenLoader } from '@/features/ui/components/FullscreenLoader.tsx'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    // Check authentication status from localStorage
    const authStatus = localStorage.getItem('is_authenticated')
    setIsAuthenticated(authStatus === 'true')
  }, [])

  // Show loader while checking auth status
  if (isAuthenticated === null) {
    return (
      <AppProviders>
        <FullscreenLoader message="Loading..." />
      </AppProviders>
    )
  }

  const router = createRouter(isAuthenticated)

  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  )
}

export default App
