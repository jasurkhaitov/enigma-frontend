import { TableCell, TableRow } from '@/components/ui/table'
import Badge from '../ui/badge'
import { Download, Trash2, Loader2 } from 'lucide-react'
import { Job, StatusVariantMap } from './HistoryTable'
import {
	useDeleteTaskMutation,
	useDownloadTaskMutation,
} from '@/service/jobsApi'
import { useEffect, useState } from 'react'

interface JobsTableContentProps {
	jobsData: Job[]
	page: number
	itemsPerPage: number
	statusVariantMap: StatusVariantMap
}

interface JobActionsProps {
	job: Job
	onDelete: () => void
}

export function JobsTableContent({
	jobsData,
	statusVariantMap,
	page,
	itemsPerPage,
}: JobsTableContentProps) {
	const [localJobs, setLocalJobs] = useState<Job[]>(jobsData)

	useEffect(() => {
		setLocalJobs(jobsData)
	}, [jobsData])

	const getVariant = (status: string): 'processing' | 'done' | 'failed' => {
		const lowercaseStatus = status.toLowerCase()
		return statusVariantMap[lowercaseStatus] || 'processing'
	}

	const getFileName = (path: string): string => {
		return path.split('/').pop() || path
	}

	return (
		<>
			{localJobs.map((job, idx) => {
				const isFailed = job.status.toLowerCase() === 'failed'

				return (
					<TableRow
						key={job.id}
						className={`text-[16px] font-medium ${
							isFailed ? 'text-gray-400' : ''
						}`}
					>
						<TableCell
							className={`w-[50px] ${
								isFailed ? 'text-gray-400' : 'text-gray-text'
							}`}
						>
							{(page - 1) * itemsPerPage + idx + 1}
						</TableCell>
						<TableCell
							className={`w-[200px] max-w-[200px] truncate ${
								isFailed ? 'text-gray-400' : ''
							}`}
							title={job.name}
						>
							{job.name}
						</TableCell>
						<TableCell
							className={`w-[150px] max-w-[150px] truncate ${
								isFailed ? 'text-gray-400' : ''
							}`}
							title={`${job.master_lang.toUpperCase()} → ${job.slave_lang.toUpperCase()}`}
						>
							{job.master_lang.toUpperCase()} → {job.slave_lang.toUpperCase()}
						</TableCell>
						<TableCell className='w-[120px] max-w-[120px]'>
							<Badge variant={getVariant(job.status)}>{job.status}</Badge>
						</TableCell>
						<TableCell
							className={`w-[250px] max-w-[250px] truncate ${
								isFailed ? 'text-gray-400' : ''
							}`}
							title={getFileName(job.processed_path)}
						>
							{getFileName(job.processed_path)}
						</TableCell>
						<TableCell className='w-[100px] text-right'>
							<JobActions
								job={job}
								onDelete={() =>
									setLocalJobs(prev => prev.filter(j => j.id !== job.id))
								}
							/>
						</TableCell>
					</TableRow>
				)
			})}
		</>
	)
}

function JobActions({ job, onDelete }: JobActionsProps) {
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
							className='absolute inset-0 bg-red-500 rounded-full opacity-20'
							style={{
								clipPath: `inset(0 ${100 - deleteProgress}% 0 0)`,
							}}
						/>
						<Trash2 className='h-5 w-5 text-red-600 animate-bounce' />
					</>
				) : (
					<Trash2 className='h-5 w-5' />
				)}
			</button>
		</div>
	)
}
