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
  page,
  itemsPerPage,
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
      {jobsData.map((job, idx) => {
        const isFailed = job.status.toLowerCase() === 'failed';
        
        return (
          <TableRow key={job.id} className={`text-[16px] font-medium ${isFailed ? 'text-gray-400' : ''}`}>
            <TableCell className={`w-[50px] ${isFailed ? 'text-gray-400' : 'text-gray-text'}`}>
              {(page - 1) * itemsPerPage + idx + 1}
            </TableCell>
            <TableCell
              className={`w-[200px] max-w-[200px] truncate ${isFailed ? 'text-gray-400' : ''}`}
              title={job.name}
            >
              {job.name}
            </TableCell>
            <TableCell
              className={`w-[150px] max-w-[150px] truncate ${isFailed ? 'text-gray-400' : ''}`}
              title={`${job.master_lang.toUpperCase()} → ${job.slave_lang.toUpperCase()}`}
            >
              {job.master_lang.toUpperCase()} → {job.slave_lang.toUpperCase()}
            </TableCell>
            <TableCell className='w-[120px] max-w-[120px]'>
              <Badge variant={getVariant(job.status)}>{job.status}</Badge>
            </TableCell>
            <TableCell
              className={`w-[250px] max-w-[250px] truncate ${isFailed ? 'text-gray-400' : ''}`}
              title={getFileName(job.processed_path)}
            >
              {getFileName(job.processed_path)}
            </TableCell>
            <TableCell className='w-[100px] text-right'>
              <JobActions job={job} />
            </TableCell>
          </TableRow>
        );
      })}
    </>
  )
}
interface JobActionsProps {
	job: Job
}

function JobActions({ job }: JobActionsProps) {
	return (
		<div className='flex justify-end gap-2'>
			<button
				disabled={job.status !== 'success'}
				className='rounded-full bg-white-mode w-11 h-11 flex items-center justify-center disabled:opacity-50'
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
