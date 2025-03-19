import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '@/store'
import { setAccessToken, logout } from '@/reducer/authSlice'
import { authApi } from '@/service/authApi'
import {
	GetTaskResponse,
	JobsResponse,
	UploadRequest,
	UploadResponse,
} from '@/typescript/type'

const BASE_URL: string = import.meta.env.VITE_API_BASE_URL

const baseQuery = fetchBaseQuery({
	baseUrl: BASE_URL,
	credentials: 'include',
	prepareHeaders: (headers, { getState }) => {
		const state = getState() as RootState
		const token = state.auth.accessToken
		headers.set('accept', 'application/json')
		if (token) {
			headers.set('Authorization', `Bearer ${token}`)
		}
		return headers
	},
})

const baseQueryWithReauth: typeof baseQuery = async (
	args,
	api,
	extraOptions
) => {
	let result = await baseQuery(args, api, extraOptions)

	if (result.error && result.error.status === 401) {
		try {
			const refreshResult = await api
				.dispatch(authApi.endpoints.refreshToken.initiate())
				.unwrap()

			if (refreshResult.access_token) {
				api.dispatch(setAccessToken(refreshResult.access_token))
				result = await baseQuery(args, api, extraOptions)
			} else {
				api.dispatch(logout())
			}
		} catch (error) {
			console.error('Failed to refresh token:', error)
			api.dispatch(logout())
		}
	}

	return result
}

export const jobsApi = createApi({
	reducerPath: 'jobsApi',
	baseQuery: baseQueryWithReauth,
	endpoints: builder => ({
		getJobs: builder.query<
			JobsResponse,
			{ page?: number; items_per_page?: number }
		>({
			query: ({ page = 1, items_per_page = 10 }) => ({
				url: `/tasks/jobs`,
				params: { page, items_per_page },
			}),
		}),
		uploadDocument: builder.mutation<UploadResponse, UploadRequest>({
			query: ({
				master_lang,
				slave_lang,
				name,
				type,
				master_file,
				slave_file,
			}) => {
				const formData = new FormData()
				formData.append('master_lang', master_lang)
				formData.append('slave_lang', slave_lang)
				formData.append('name', name)
				formData.append('type', type)
				formData.append('master_file', master_file)
				if (slave_file) {
					formData.append('slave_file', slave_file)
				}
				return {
					url: '/tasks/task',
					method: 'POST',
					body: formData,
				}
			},
		}),
		getTaskInformation: builder.query<GetTaskResponse, string>({
			query: task_id => ({ url: `/tasks/task/${task_id}`, method: 'GET' }),
		}),
		downloadTask: builder.mutation<GetTaskResponse, string>({
			query: task_id => ({ url: `/tasks/download/${task_id}`, method: 'GET' }),
		}),
	}),
})

export const {
	useGetJobsQuery,
	useUploadDocumentMutation,
	useGetTaskInformationQuery,
	useDownloadTaskMutation,
} = jobsApi
