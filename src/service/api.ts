const BASE_URL: string = import.meta.env.VITE_API_BASE_URL
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface LoginRequest {
	username: string
	password: string
}

interface LoginResponse {
	access_token: string
	refresh_token: string
	user: {
		id: string
		email: string
	}
}

interface RefreshTokenResponse {
	access_token: string
}

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
	}),
	endpoints: builder => ({
		login: builder.mutation<LoginResponse, LoginRequest>({
			query: credential => ({
				url: '/login',
				method: 'POST',
				headers: {
					accept: 'application/json',
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				credentials: 'include',
				body: new URLSearchParams({
					grant_type: '',
					username: credential.username,
					password: credential.password,
					scope: '',
					client_id: '',
					client_secret: '',
				}).toString(),
			}),
		}),

		refreshToken: builder.mutation<
			RefreshTokenResponse,
			{ refreshToken: string }
		>({
			query: ({ refreshToken }) => ({
				url: `/refresh?refresh_token=${refreshToken}`,
				method: 'POST',
				headers: {
					accept: 'application/json',
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: new URLSearchParams({ refresh_token: refreshToken }),
			}),
		}),
	}),
})

export const { useLoginMutation, useRefreshTokenMutation } = authApi
