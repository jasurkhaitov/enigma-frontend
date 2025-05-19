import { useEffect, useState, useCallback } from 'react'
import { useAppDispatch } from '@/store'
import { setAccessToken, logout } from '@/reducer/authSlice'
import { useLazyCheckMeQuery, useRefreshTokenMutation } from '@/service/authApi'

interface UseAuthResult {
  isAuthenticated: boolean
  isLoading: boolean
  checkAuthStatus: () => Promise<boolean>
}

export const useAuth = (): UseAuthResult => {
  const dispatch = useAppDispatch()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [checkMe, { isLoading: isCheckingMe }] = useLazyCheckMeQuery()
  const [refreshToken] = useRefreshTokenMutation()

  const checkAuthStatus = useCallback(async (): Promise<boolean> => {
    setIsLoading(true)

    try {
      const storedToken = localStorage.getItem('accessToken')

      if (!storedToken) {
        setIsAuthenticated(false)
        setIsLoading(false)
        return false
      }

      const response = await checkMe().unwrap()

      if (response) {
        dispatch(setAccessToken(storedToken))
        setIsAuthenticated(true)
        setIsLoading(false)
        return true
      }

      return false
    } catch (error) {
      
      try {
        const refreshResponse = await refreshToken().unwrap()
        
        if (refreshResponse.access_token) {
          dispatch(setAccessToken(refreshResponse.access_token))
          setIsAuthenticated(true)
          setIsLoading(false)
          return true
          console.log(error)
        }
        
        throw new Error('Failed to refresh token')
      } catch (refreshError) {
        dispatch(logout())
        setIsAuthenticated(false)
        setIsLoading(false)
        return false
        console.error('Authentication failed:', refreshError)
      }
    }
  }, [checkMe, dispatch, refreshToken])

  useEffect(() => {
    checkAuthStatus()
  }, [checkAuthStatus])

  return {
    isAuthenticated,
    isLoading: isLoading || isCheckingMe,
    checkAuthStatus,
  }
}

export default useAuth