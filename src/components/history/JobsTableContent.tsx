import { TableCell, TableRow } from '@/components/ui/table'
import Badge from '../ui/badge'
import { Download, Trash2 } from 'lucide-react'
import { Job, StatusVariantMap } from './HistoryTable'

interface JobsTableContentProps {
	jobsData: Job[]
	page: number
	itemsPerPage: number
	statusVariantMap: StatusVariantMap
}

export function JobsTableContent({
	jobsData,
	statusVariantMap,
}: JobsTableContentProps) {
	const getVariant = (status: string): 'processing' | 'done' | 'failed' => {
		const lowercaseStatus = status.toLowerCase()
		return statusVariantMap[lowercaseStatus] || 'processing'
	}

	const getFileName = (path: string): string => {
		return path.split('/').pop() || path
	}

	return (
		<>
			{jobsData.map((job, idx) => (
				<TableRow key={job.id} className='text-[16px] font-medium'>
					<TableCell className='w-[50px] text-gray-text'>{idx + 1}</TableCell>
					<TableCell
						className='w-[200px] max-w-[200px] truncate'
						title={job.name}
					>
						{job.name}
					</TableCell>
					<TableCell
						className='w-[150px] max-w-[150px] truncate'
						title={`${job.master_lang.toUpperCase()} → ${job.slave_lang.toUpperCase()}`}
					>
						{job.master_lang.toUpperCase()} → {job.slave_lang.toUpperCase()}
					</TableCell>
					<TableCell className='w-[120px] max-w-[120px]'>
						<Badge variant={getVariant(job.status)}>{job.status}</Badge>
					</TableCell>
					<TableCell
						className='w-[250px] max-w-[250px] truncate'
						title={getFileName(job.processed_path)}
					>
						{getFileName(job.processed_path)}
					</TableCell>
					<TableCell className='w-[100px] text-right'>
						<JobActions jobStatus={job.status} />
					</TableCell>
				</TableRow>
			))}
		</>
	)
}

interface JobActionsProps {
	jobStatus: string
}

function JobActions({ jobStatus }: JobActionsProps) {
	return (
		<div className='flex justify-end gap-2'>
			<button
				disabled={jobStatus !== 'success'}
				className='rounded-full bg-white-mode w-11 h-11 flex items-center justify-center'
				title='Download file'
			>
				<Download className='h-5 w-5' />
			</button>
			<button
				className='rounded-full bg-white-mode w-11 h-11 flex items-center justify-center'
				title='Delete job'
			>
				<Trash2 className='h-5 w-5' />
			</button>
		</div>
	)
}
