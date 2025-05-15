// JobsTableContent.tsx
import { TableCell, TableRow } from '@/components/ui/table'
import Badge from '../ui/badge'
import { Job, StatusVariantMap } from './HistoryTable'
import { JobActions } from './JobActions'
import { useEffect, useState } from 'react'
import { formatTimestamp } from '@/util/function'

interface JobsTableContentProps {
	jobsData: Job[]
	page: number
	itemsPerPage: number
	statusVariantMap: StatusVariantMap
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

	const getFileName = (url: string | null | undefined): string => {
		if (!url) return 'File Not Exist'
	
		const filenameMatch = url.match(/filename%3D%22([^"]+)%22/)
	
		if (filenameMatch && filenameMatch[1]) {
			const decodedFileName = decodeURIComponent(decodeURIComponent(filenameMatch[1]))
			return decodedFileName
		}
	
		// Fallback: get the last part after /
		const fallbackName = url.split('/').pop() || 'File Not Exist'
		return fallbackName
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
							title={job.created_at}
						>
							{formatTimestamp(job.created_at)}
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
