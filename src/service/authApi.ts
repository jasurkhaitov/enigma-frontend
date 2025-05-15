import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import {
	LoginRequest,
	LoginResponse,
	RefreshTokenResponse,
} from '@/typescript/type'

export interface RegisterRequest {
  name: string
  username: string
  email: string
  password: string
}

export interface VerifyCodeRequest {
  code: string
}

export interface RegisterResponse {
  id: string
}

export interface VerifyCodeResponse {
  success: boolean
  message: string
}

export interface ErrorResponse {
  data: {
    detail: string
  }
}

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
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
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
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (userData) => ({
        url: '/signup',
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      }),
    }),
    verifyCode: builder.mutation<VerifyCodeResponse, VerifyCodeRequest>({
      query: (data) => ({
        url: '/verify-code',
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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
        credentials: 'include',
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyCodeMutation,
  useRefreshTokenMutation,
  useLogoutMutation
} = authApi