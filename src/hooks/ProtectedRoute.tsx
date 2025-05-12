import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../store'
import { useEffect, useState } from 'react'
import { useRefreshAuth } from '@/service/refreshAuth'
import AnimatedLoader from '@/components/ui/icons/AnimatedLoader'

const ProtectedRoute = () => {
	const { accessToken } = useAppSelector(state => state.auth)
	const [isLoading, setIsLoading] = useState(true)
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const { refreshAccessToken } = useRefreshAuth()

	useEffect(() => {
		const checkAuthentication = async () => {
			if (accessToken) {
				setIsAuthenticated(true)
				setIsLoading(false)
				return
			}

			const { success } = await refreshAccessToken()

			setIsAuthenticated(success)
			setIsLoading(false)
		}

		checkAuthentication()
	}, [accessToken, refreshAccessToken])

	if (isLoading) {
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