export interface errorMsg {
	status: number
	data: {
		detail: string
	}
}

export type FileState = File | null

export type DragEventHandlers = (event: React.DragEvent<HTMLDivElement>) => void

export type InputChangeHandler = (
	event: React.ChangeEvent<HTMLInputElement>
) => void

export const MAX_FILE_SIZE = 10 * 1024 * 1024

export interface Job {
	job_id: string
	master_lang: string
	slave_lang: string
	id: string
	name: string
	status: string
	processed_path: string
}

export interface JobsResponse {
	data: Job[]
	page: number
	items_per_page: number
	total: number
	total_count: number
	has_more: boolean
}

export interface UploadRequest {
	master_lang: string
	slave_lang: string
	name: string
	type: string
	master_file: File
	slave_file?: File | null
}

export interface UploadResponse {
	id: string
	job_id: string
	status: string
}

export interface GetTaskResponse {
	file_url: any
	function: string
	args: TaskArgument[]
	kwargs: Record<string, unknown>
	job_try: number
	enqueue_time: string
	score: number | null
	success: boolean
	result: string
	start_time: string
	finish_time: string
	queue_name: string
	job_id: string | null
}

interface TaskArgument {
	id: string
	user_id: string
	job_id: string | null
	master_lang: string
	slave_lang: string
	name: string
	status: string | null
	task_type: string | null
	master_path: string
	slave_path: string | null
	processed_path: string
}

export interface LoginRequest {
	username: string
	password: string
}

export interface LoginResponse {
	access_token: string
	user: {
		id: string
		email: string
	}
}

export interface RefreshTokenResponse {
	access_token: string
}
