import { Outlet, ScrollRestoration } from 'react-router-dom'

export const RootLayout = () => (
  <div className="min-h-screen bg-mint-50">
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-mint-100/30 pb-16">
      <main className="flex-1">
        <Outlet />
      </main>
      <ScrollRestoration />
    </div>
  </div>
)
