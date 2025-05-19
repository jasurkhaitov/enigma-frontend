import { Navigate, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import AnimatedLoader from '@/components/ui/icons/AnimatedLoader'
import { useAuth } from '@/hooks/useAuth'

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading, checkAuthStatus } = useAuth()
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    const verifyAuthStatus = async () => {
      await checkAuthStatus()
      setAuthChecked(true)
    }

    verifyAuthStatus()
  }, [checkAuthStatus])

  if (isLoading || !authChecked) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <AnimatedLoader />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}

export default ProtectedRoute