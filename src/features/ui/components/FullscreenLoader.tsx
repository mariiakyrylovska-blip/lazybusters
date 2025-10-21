interface FullscreenLoaderProps {
  message?: string
}

export const FullscreenLoader = ({ message = 'Loading...' }: FullscreenLoaderProps) => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-mint-50 px-6 py-12 text-center text-font-muted">
    <div className="app-card w-full max-w-sm">
      <h1 className="font-display text-3xl text-font-primary">Lazy Busters</h1>
      <p className="mt-4 text-lg leading-snug">{message}</p>
      <p className="mt-2 text-sm opacity-75">Fetching your cozy routines...</p>
    </div>
  </div>
)
