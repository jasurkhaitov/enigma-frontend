import { useRefreshTokenMutation } from '@/service/authApi'
import { useAppDispatch } from '@/store'
import { setAccessToken } from '@/reducer/authSlice'
import { useCallback } from 'react'

interface ApiError {
  status: number
  data: {
    detail?: string
  }
}

export const useRefreshAuth = () => {
  const dispatch = useAppDispatch()
  const [refreshTokenMutation] = useRefreshTokenMutation()

  const refreshAccessToken = useCallback(async () => {
    try {
      const response = await refreshTokenMutation().unwrap()

      if (response.access_token) {
        dispatch(setAccessToken(response.access_token))
        return { success: true }
      }

      return { success: false }
    } catch (error) {
      const err = error as ApiError

      if (err?.data?.detail === "Refresh token missing.") {
        return { success: false }
      }

      return { success: false }
    }
  }, [dispatch, refreshTokenMutation])

  return { refreshAccessToken }
}
