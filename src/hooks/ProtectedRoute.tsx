import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../store'
import { useEffect, useState } from 'react'
import { useRefreshAuth } from '@/service/refreshAuth'

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
		return <div>Loading...</div>
	}

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />
	}

	return <Outlet />
}

export default ProtectedRoute
