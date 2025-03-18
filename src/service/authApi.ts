import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import {
	LoginRequest,
	LoginResponse,
	RefreshTokenResponse,
} from '@/typescript/type'

const BASE_URL: string = import.meta.env.VITE_API_BASE_URL

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).auth.accessToken
			if (token) {
				headers.set('Authorization', `Bearer ${token}`)
			}
			return headers
		},
	}),
	endpoints: builder => ({
		login: builder.mutation<LoginResponse, LoginRequest>({
			query: credentials => ({
				url: '/login',
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: new URLSearchParams({
					username: credentials.username,
					password: credentials.password,
					grant_type: 'password',
					scope: '',
					client_id: '',
					client_secret: '',
				}).toString(),
			}),
		}),
		refreshToken: builder.mutation<RefreshTokenResponse, void>({
			query: () => ({
				url: '/refresh',
				method: 'POST',
				credentials: 'include',
			}),
		}),
		logout: builder.mutation<void, void>({
			query: () => ({
				url: '/logout',
				method: 'POST',
			}),
		}),
	}),
})

export const { useLoginMutation, useRefreshTokenMutation, useLogoutMutation } =
	authApi
