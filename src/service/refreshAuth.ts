import { useRefreshTokenMutation } from '@/service/authApi'
import { useAppDispatch } from '@/store'
import { setAccessToken, logout } from '@/reducer/authSlice'
import { useCallback } from 'react'

export const useRefreshAuth = () => {
	const dispatch = useAppDispatch()
	const [refreshTokenMutation] = useRefreshTokenMutation()

	const refreshAccessToken = useCallback(async () => {
		
		try {
			const response = await refreshTokenMutation().unwrap()
			console.log(response);

			
			if (response.access_token) {
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
