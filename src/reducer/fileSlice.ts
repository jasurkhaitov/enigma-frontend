import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'sonner'

const MAX_FILE_SIZE = 10 * 1024 * 1024

export type FileState = File | null

interface MultipleFileState {
	dragActive1: boolean
	dragActive2: boolean
	file1: FileState
	file2: FileState
	uploading1: boolean
	uploading2: boolean
	showSuccess1: boolean
	showSuccess2: boolean
	error1: boolean
	error2: boolean
}

const initialState: MultipleFileState = {
	dragActive1: false,
	dragActive2: false,
	file1: null,
	file2: null,
	uploading1: false,
	uploading2: false,
	showSuccess1: false,
	showSuccess2: false,
	error1: false,
	error2: false,
}

const validateFile = (file: File): string | null => {
	if (
		file.type !==
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
	) {
		return 'Invalid file format'
	}

	if (file.size > MAX_FILE_SIZE) {
		return 'File size exceeds 10 MB limit'
	}

	return null
}

const multipleFileSlice = createSlice({
	name: 'multipleFile',
	initialState,
	reducers: {
		setDragActive: (
			state,
			action: PayloadAction<{ dropzoneId: 1 | 2; isActive: boolean }>
		) => {
			const { dropzoneId, isActive } = action.payload
			if (dropzoneId === 1) {
				state.dragActive1 = isActive
			} else {
				state.dragActive2 = isActive
			}
		},

		startFileUpload: (
			state,
			action: PayloadAction<{ dropzoneId: 1 | 2; file: File }>
		) => {
			const { dropzoneId, file } = action.payload
			const errorMessage = validateFile(file)

			if (errorMessage) {
				if (errorMessage.includes('format')) {
					toast.error('Please upload a DOCX file only')
				} else {
					toast.error('Maximum file size is 10 MB')
				}

				if (dropzoneId === 1) {
					state.error1 = true
				} else {
					state.error2 = true
				}
				return
			}

			if (dropzoneId === 1) {
				state.uploading1 = true
			} else {
				state.uploading2 = true
			}
		},

		completeFileUpload: (
			state,
			action: PayloadAction<{ dropzoneId: 1 | 2; file: File }>
		) => {
			const { dropzoneId, file } = action.payload

			if (dropzoneId === 1) {
				state.uploading1 = false
				state.showSuccess1 = true
				state.file1 = file
			} else {
				state.uploading2 = false
				state.showSuccess2 = true
				state.file2 = file
			}

			toast.success(`${file.name} has been successfully uploaded`)
		},

		hideSuccess: (state, action: PayloadAction<{ dropzoneId: 1 | 2 }>) => {
			const { dropzoneId } = action.payload

			if (dropzoneId === 1) {
				state.showSuccess1 = false
			} else {
				state.showSuccess2 = false
			}
		},

		resetError: (state, action: PayloadAction<{ dropzoneId: 1 | 2 }>) => {
			const { dropzoneId } = action.payload

			if (dropzoneId === 1) {
				state.error1 = false
			} else {
				state.error2 = false
			}
		},

		removeFile: (state, action: PayloadAction<{ dropzoneId: 1 | 2 }>) => {
			const { dropzoneId } = action.payload

			if (dropzoneId === 1 && state.file1) {
				toast.info(`${state.file1.name} has been removed`)
				state.file1 = null
			} else if (dropzoneId === 2 && state.file2) {
				toast.info(`${state.file2.name} has been removed`)
				state.file2 = null
			}
		},

		compareFiles: state => {
			if (state.file1 && state.file2) {
				toast.success('Your documents are being compared')
			} else {
				toast.error('Please upload both files before comparing')
			}
		},
	},
})

export const {
	setDragActive,
	startFileUpload,
	completeFileUpload,
	hideSuccess,
	resetError,
	removeFile,
	compareFiles,
} = multipleFileSlice.actions

export default multipleFileSlice.reducer
