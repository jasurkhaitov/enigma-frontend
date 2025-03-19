import { useRefreshTokenMutation } from '@/service/authApi'
import { useAppDispatch } from '@/store'
import { setAccessToken, logout } from '@/reducer/authSlice'
import { useCallback } from 'react'
import { useLogout } from '@/hooks/useLogout'

export const useRefreshAuth = () => {
	const dispatch = useAppDispatch()
	const [refreshTokenMutation] = useRefreshTokenMutation()
	const logoutf = useLogout()

	const refreshAccessToken = useCallback(async () => {
		try {
			const response = await refreshTokenMutation().unwrap()

			if (response.access_token) {
				dispatch(setAccessToken(response.access_token))
				return { success: true }
			}

			return { success: false }
		} catch (error) {
			console.error('Failed to refresh token:', error)
			dispatch(logout())
			logoutf()
			return { success: false }
		}
	}, [dispatch, logoutf, refreshTokenMutation])

	return { refreshAccessToken }
}
