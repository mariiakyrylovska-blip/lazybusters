import { useState, useEffect } from 'react'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    // Check if user is authenticated from localStorage
    const authStatus = localStorage.getItem('is_authenticated')
    const email = localStorage.getItem('user_email')
    
    setIsAuthenticated(authStatus === 'true')
    setUserEmail(email)
  }, [])

  const login = (email: string) => {
    localStorage.setItem('user_email', email)
    localStorage.setItem('is_authenticated', 'true')
    setIsAuthenticated(true)
    setUserEmail(email)
  }

  const logout = () => {
    localStorage.removeItem('user_email')
    localStorage.removeItem('is_authenticated')
    setIsAuthenticated(false)
    setUserEmail(null)
  }

  return {
    isAuthenticated,
    userEmail,
    login,
    logout,
  }
}

