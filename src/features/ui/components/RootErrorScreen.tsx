import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

export const RootErrorScreen = () => {
  const error = useRouteError()
  const title = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : 'Something went wrong'
  const message = isRouteErrorResponse(error)
    ? error.data || 'Please check the address and try again.'
    : (error as Error)?.message ?? 'Unexpected error'

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-mint-50 px-6 text-center">
      <div className="app-card w-full max-w-sm">
        <h1 className="font-display text-4xl text-font-primary">{title}</h1>
        <p className="mt-4 text-font-muted">{message}</p>
      </div>
    </div>
  )
}
