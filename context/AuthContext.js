import { useState, useEffect, createContext } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    user ? setIsAuthorized(true) : setIsAuthorized(false)
  }, [])

  const logout = () => {
    localStorage.removeItem('user')
    setIsAuthorized(false)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
        logout
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
