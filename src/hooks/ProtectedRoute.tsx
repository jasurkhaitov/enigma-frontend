import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '@/store'
import { useEffect, useState } from 'react'
import { useRefreshAuth } from '@/service/refreshAuth'
import { Loader } from 'lucide-react'

const ProtectedRoute = () => {
	const accessToken = useAppSelector(state => state.auth.accessToken)
	const { refreshAccessToken } = useRefreshAuth()
	const [isAuthChecked, setIsAuthChecked] = useState(false)
	const [isValidToken, setIsValidToken] = useState(!!accessToken)

	useEffect(() => {
		const checkAuth = async () => {
			if (!accessToken) {
				const { success } = await refreshAccessToken()
				setIsValidToken(success)
			} else {
				setIsValidToken(true)
			}
			setIsAuthChecked(true)
		}

		checkAuth()
	}, [accessToken, refreshAccessToken])

	if (!isAuthChecked) {
		return (
			<div className='flex items-center justify-center h-screen'>
				<Loader className='animate-spin text-primary' size={50} />
			</div>
		)
	}

	return isValidToken ? <Outlet /> : <Navigate to='/login' replace />
}

export default ProtectedRoute
