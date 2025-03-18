import { useState, useRef, useEffect } from 'react'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import { AlertTriangle, Upload, X } from 'lucide-react'
import { Icons } from '../ui/icons/IconSvg'
import { MAX_FILE_SIZE } from '@/typescript/type'

type FileState = File | null

interface FileDropzoneProps {
	title: string
	file: FileState
	setFile: React.Dispatch<React.SetStateAction<FileState>>
}

const FileDropzone: React.FC<FileDropzoneProps> = ({
	title,
	file,
	setFile,
}) => {
	const [dragActive, setDragActive] = useState<boolean>(false)
	const [uploading, setUploading] = useState<boolean>(false)
	const [error, setError] = useState<boolean>(false)
	const [progress, setProgress] = useState<number>(0)
	const inputRef = useRef<HTMLInputElement>(null)
	const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

	useEffect(() => {
		if (uploading) {
			setProgress(0)

			let currentProgress = 0
			progressIntervalRef.current = setInterval(() => {
				const increment = Math.max(1, (95 - currentProgress) / 10)
				currentProgress = Math.min(95, currentProgress + increment)
				setProgress(currentProgress)

				if (currentProgress >= 95) {
					if (progressIntervalRef.current) {
						clearInterval(progressIntervalRef.current)
					}
				}
			}, 300)

			const timer = setTimeout(() => {
				if (progressIntervalRef.current) {
					clearInterval(progressIntervalRef.current)
					progressIntervalRef.current = null
				}

				setProgress(100)

				setTimeout(() => {
					setUploading(false)
					setProgress(0)
				}, 500)
			}, 1000)

			return () => {
				clearTimeout(timer)
				if (progressIntervalRef.current) {
					clearInterval(progressIntervalRef.current)
					progressIntervalRef.current = null
				}
			}
		}
	}, [uploading])

	useEffect(() => {
		if (error) {
			const timer = setTimeout(() => {
				setError(false)
			}, 3000)
			return () => clearTimeout(timer)
		}
	}, [error])

	const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		e.stopPropagation()

		if (e.type === 'dragenter' || e.type === 'dragover') {
			setDragActive(true)
		} else if (e.type === 'dragleave' || e.type === 'drop') {
			setDragActive(false)
		}
	}

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		e.stopPropagation()

		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			handleFile(e.dataTransfer.files[0])
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()

		if (e.target.files && e.target.files[0]) {
			handleFile(e.target.files[0])
		}
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

	const handleFile = (file: File) => {
		const errorMessage = validateFile(file)

		if (errorMessage) {
			if (errorMessage.includes('format')) {
				toast.error('Please upload a DOCX file only')
			} else {
				toast.error('Maximum file size is 10 MB')
			}
			setError(true)
			return
		}

		setUploading(true)
		setTimeout(() => {
			setFile(file)
			toast.success(`${file.name} has been successfully uploaded`)
		}, 1000)
	}

	const handleRemoveFile = () => {
		if (file) {
			const fileName = file.name
			setFile(null)
			toast.info(`${fileName} has been removed`)
		}
	}

	const getDropzoneClasses = () => {
		const baseClasses =
			'flex-1 border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 relative overflow-hidden'

		if (error) {
			return `${baseClasses} border-destructive bg-destructive/10`
		} else if (dragActive) {
			return `${baseClasses} border-blue-500 bg-blue-100 dark:bg-blue-950/30`
		} else if (uploading) {
			return `${baseClasses} border-blue-500 bg-blue-100 dark:bg-blue-950/30`
		} else if (file) {
			return `${baseClasses} border-blue-500 bg-blue-100 dark:bg-blue-950/30`
		} else {
			return `${baseClasses} border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600`
		}
	}

	const formatFileSize = (size: number): string => {
		if (size < 1024 * 1024) {
			return `${(size / 1024).toFixed(2)} KB`
		} else {
			return `${(size / 1024 / 1024).toFixed(2)} MB`
		}
	}

	return (
		<div
			className={`${getDropzoneClasses()} h-[250px]`}
			onDragEnter={handleDrag}
			onDragLeave={handleDrag}
			onDragOver={handleDrag}
			onDrop={handleDrop}
		>
			<input
				ref={inputRef}
				type='file'
				className='hidden'
				onChange={handleChange}
				accept='.docx'
			/>

			{file && !uploading && (
				<button
					onClick={handleRemoveFile}
					className='absolute top-2 right-2 p-1 rounded-full bg-transparent hover:bg-gray-100 cursor-pointer transition-colors'
					aria-label='Remove file'
				>
					<X size={16} />
				</button>
			)}

			<div className='flex flex-col items-center justify-center h-full'>
				<div className='mb-4 rounded-full'>
					{error ? (
						<AlertTriangle size={50} className='text-destructive' />
					) : uploading ? (
						<Upload size={50} className='text-blue-500' />
					) : file ? (
						<Icons.PdfIcon size={50} className='text-blue-500' />
					) : (
						<Icons.PdfIcon size={50} className='text-gray-400' />
					)}
				</div>

				<h3 className='font-medium text-lg mb-1'>
					{error
						? 'Invalid File'
						: file
						? `${file.name.slice(0, 25)}${file.name.length > 25 ? '...' : ''}`
						: title}
				</h3>

				<p className='text-gray-500 dark:text-gray-400 text-sm mb-4'>
					{error
						? 'Only DOCX files up to 10 MB are allowed'
						: uploading
						? `Uploading file... ${progress.toFixed(0)}%`
						: file
						? formatFileSize(file.size)
						: 'Drag and drop or click to select'}
				</p>

				{!file && !error && !uploading && (
					<Button
						variant='outlined'
						onClick={() => inputRef.current?.click()}
						className='text-sm'
					>
						<Upload size={20} className='mr-1 translate-y-0.5' />
						Select DOCX file
					</Button>
				)}

				{uploading && (
					<div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2'>
						<div
							className='bg-blue-500 h-2.5 rounded-full transition-all duration-300'
							style={{ width: `${progress}%` }}
						></div>
					</div>
				)}
			</div>
		</div>
	)
}

export default FileDropzone
