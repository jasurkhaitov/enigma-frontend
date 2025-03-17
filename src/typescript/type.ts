export interface errorMsg {
	status: number
	data: {
		detail: string
	}
}

export type FileState = File | null

export type DragEventHandlers = (event: React.DragEvent<HTMLDivElement>) => void

export type InputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => void

export const MAX_FILE_SIZE = 10 * 1024 * 1024