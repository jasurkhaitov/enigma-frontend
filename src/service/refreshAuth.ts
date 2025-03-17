import { useRefreshTokenMutation } from '@/service/api'
import { useAppDispatch } from '@/store'
import { setAccessToken, logout } from '@/reducer/authSlice'
import { useCallback } from 'react'

export const useRefreshAuth = () => {
	const dispatch = useAppDispatch()
	const [refreshTokenMutation] = useRefreshTokenMutation()

	const refreshAccessToken = useCallback(async () => {
		try {
			const refreshToken = localStorage.getItem('refreshToken')

			if (!refreshToken) {
				dispatch(logout())
				return { success: false }
			}

			const response = await refreshTokenMutation({ refreshToken }).unwrap()
			if (response?.access_token) {
				dispatch(setAccessToken(response.access_token))
				return { success: true }
			}

			return { success: false }
		} catch (error) {
			console.error('Failed to refresh token:', error)
			dispatch(logout())
			return { success: false }
		}
	}, [dispatch, refreshTokenMutation])

	return { refreshAccessToken }
}
