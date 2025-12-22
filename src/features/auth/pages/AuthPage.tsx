import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/features/ui/components/Button.tsx'

export const AuthPage = () => {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate auth - in real app would call Supabase
    setTimeout(() => {
      localStorage.setItem('user_email', email)
      localStorage.setItem('is_authenticated', 'true')
      setLoading(false)
      navigate('/', { replace: true })
    }, 500)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-mint-50 to-mint-100 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <h1 className="font-display text-3xl font-bold text-center text-peach-200 mb-2">
            Lazy Busters
          </h1>
          <p className="text-center text-font-muted text-sm mb-8">
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-lg border-2 border-fog-50 bg-fog-50 px-4 py-3 text-font-primary placeholder-font-muted focus:border-peach-200 focus:bg-white focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-lg border-2 border-fog-50 bg-fog-50 px-4 py-3 text-font-primary placeholder-font-muted focus:border-peach-200 focus:bg-white focus:outline-none"
            />
            <Button
              fullWidth
              disabled={loading}
              className="mt-2"
            >
              {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Sign Up'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-font-muted">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="font-semibold text-peach-200 hover:text-peach-100"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

