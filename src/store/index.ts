import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import authReducer from '@/reducer/authSlice'
import languageReducer from '@/reducer/languageSlice'
import multipleFileReducer from '@/reducer/fileSlice'

import { authApi } from '@/service/authApi'
import { jobsApi } from '@/service/jobsApi'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		language: languageReducer,
		multipleFile: multipleFileReducer,
		[authApi.reducerPath]: authApi.reducer,
		[jobsApi.reducerPath]: jobsApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			thunk: true,
		}).concat(authApi.middleware, jobsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
