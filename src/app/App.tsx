import { AppProviders } from './providers/AppProviders.tsx'
import { AuthRouter } from './AuthRouter.tsx'

const App = () => (
  <AppProviders>
    <AuthRouter />
  </AppProviders>
)

export default App
