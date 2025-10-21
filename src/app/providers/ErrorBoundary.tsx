import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('App error', error, errorInfo)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex min-h-screen flex-col items-center justify-center bg-mint-50 text-font-primary">
            <div className="app-card max-w-sm text-center">
              <h1 className="font-display text-3xl">Oh no!</h1>
              <p className="mt-4 text-font-muted">
                Something startled Stasik and Koshara. Please refresh the page to try again.
              </p>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
