import { Download, Trash2, Loader2 } from 'lucide-react'
import { Job } from './HistoryTable'
import {
	useDeleteTaskMutation,
	useDownloadTaskMutation,
} from '@/service/jobsApi'
import { useEffect, useState } from 'react'

interface JobActionsProps {
	job: Job
	onDelete: () => void
}

export function JobActions({ job, onDelete }: JobActionsProps) {
	const [downloadTask] = useDownloadTaskMutation()
	const [deleteTask] = useDeleteTaskMutation()
	const [isDownloading, setIsDownloading] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)
	const [deleteProgress, setDeleteProgress] = useState(0)
	const [rowElement, setRowElement] = useState<Element | null>(null)

	useEffect(() => {
		const findParentRow = (element: HTMLElement | null): Element | null => {
			if (!element) return null
			if (element.tagName === 'TR') return element
			return findParentRow(element.parentElement)
		}

		if (!rowElement) {
			const button = document.getElementById(`delete-btn-${job.id}`)
			setRowElement(findParentRow(button))
		}
	}, [job.id, rowElement])

	const handleDownload = async () => {
		try {
			if (job.job_id) {
				setIsDownloading(true)
				const res = await downloadTask(job.job_id).unwrap()

				const link = document.createElement('a')
				link.href = res.file_url
				link.download = ''
				document.body.appendChild(link)
				link.click()
				document.body.removeChild(link)

				setTimeout(() => {
					setIsDownloading(false)
				}, 1000)
			}
		} catch (error) {
			console.error('Download failed:', error)
			setIsDownloading(false)
		}
	}

	const handleDelete = async () => {
		try {
			if (job.job_id) {
				setIsDeleting(true)

				const interval = setInterval(() => {
					setDeleteProgress(prev => {
						if (prev >= 100) {
							clearInterval(interval)
							return 100
						}
						return prev + 20
					})
				}, 50)

				await deleteTask(job.id).unwrap()

				if (rowElement) {
					rowElement.classList.add('delete-animation')
				}

				setTimeout(() => {
					clearInterval(interval)
					onDelete()
				}, 500)
			}
		} catch (error) {
			console.error('Delete failed:', error)
			setIsDeleting(false)
			setDeleteProgress(0)
		}
	}

	return (
		<div className='flex justify-end gap-2'>
			<button
				disabled={job.status !== 'success' || isDownloading}
				className={`rounded-full bg-white-mode hover:bg-gray-200 transition cursor-pointer w-11 h-11 flex items-center justify-center disabled:opacity-50 ${
					isDownloading ? 'animate-pulse' : ''
				} ${isDownloading && !isDeleting ? 'success-pulse' : ''}`}
				title='Download file'
				onClick={handleDownload}
			>
				{isDownloading ? (
					<Loader2 className='h-5 w-5 animate-spin' />
				) : (
					<Download className='h-5 w-5' />
				)}
			</button>

			<button
				disabled={job.status !== 'success' || isDeleting}
				id={`delete-btn-${job.id}`}
				className={`relative rounded-full bg-white-mode disabled:opacity-50 hover:bg-gray-200 transition cursor-pointer w-11 h-11 flex items-center justify-center ${
					isDeleting ? 'bg-red-100' : ''
				}`}
				title='Delete job'
				onClick={handleDelete}
			>
				{isDeleting ? (
					<>
						<div
							className='absolute inset-0 bg-red-300 rounded-full'
							style={{
								clipPath: `inset(0 ${100 - deleteProgress}% 0 0)`,
							}}
						/>
						<Trash2 className='h-5 w-5 text-red-700 animate-bounce' />
					</>
				) : (
					<Trash2 className='h-5 w-5' />
				)}
			</button>
		</div>
	)
}
