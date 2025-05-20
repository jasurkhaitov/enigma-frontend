import { useNavigate } from 'react-router'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '@/reducer/authSlice'
import { useLogoutMutation } from '@/service/authApi'
export function useLogout() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [triggerLogout] = useLogoutMutation()

	return useCallback(async () => {
		try {
			await triggerLogout().unwrap()

			dispatch(logout())

			navigate('/login', { replace: true })
		} catch (error) {
			console.error('Logout failed:', error)

			dispatch(logout())
		}
	}, [navigate, dispatch, triggerLogout])
}
