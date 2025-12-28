import { RouterProvider } from 'react-router-dom'
import { AppProviders } from './providers/AppProviders.tsx'
import { router } from './router.tsx'

const App = () => {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  )
}

export default App
