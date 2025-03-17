import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '@/store'

const BASE_URL: string = import.meta.env.VITE_API_BASE_URL

interface Job {
	job_id: string
	master_lang: string
	slave_lang: string
	id: string
	name: string
	status: string
	processed_path: string
}

interface JobsResponse {
	data: Job[]
	page: number
	items_per_page: number
	total: number
	total_count: number
	has_more: boolean
}

interface UploadRequest {
	master_lang: string
	slave_lang: string
	name: string
	type: string
	master_file: File
	slave_file?: File | null
}

interface UploadResponse {
	id: string
	job_id: string
	status: string
}

interface GetTaskResponse {
	success: boolean
  status: string
	args: string[]
	enqueue_time: string | number | Date
	id: string
}

export const jobsApi = createApi({
	reducerPath: 'jobsApi',

	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: (headers, { getState }) => {
			const state = getState() as RootState
			const token = state.auth.accessToken

			headers.set('accept', 'application/json')

			if (token) {
				headers.set('Authorization', `Bearer ${token}`)
			}

			return headers
		},
	}),

	endpoints: builder => ({
		getJobs: builder.query<
			JobsResponse,
			{ page?: number; items_per_page?: number }
		>({
			query: ({ page = 1, items_per_page = 10 }) => ({
				url: `/tasks/jobs`,
				params: {
					page,
					items_per_page,
				},
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
			query: task_id => ({
				url: `/tasks/task/${task_id}`,
				method: 'GET',
			}),
		}),

		downloadTask: builder.mutation<GetTaskResponse, string>({
			query: task_id => ({
				url: `/tasks/dowload/${task_id}`,
				method: 'GET',
			}),
		}),
	}),
})

export const {
	useGetJobsQuery,
	useUploadDocumentMutation,
	useGetTaskInformationQuery,
	useDownloadTaskMutation
} = jobsApi
