import { TableCell, TableRow } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'

interface JobsTableSkeletonProps {
	rowCount?: number
}

export function LoadingTableRow({ rowCount = 10 }: JobsTableSkeletonProps) {
	return (
		<>
			{Array.from({ length: rowCount }).map((_, idx) => (
				<TableRow
					key={`skeleton-row-${idx}`}
					className='text-[16px] font-medium'
				>
					<TableCell className='text-gray-text'>
						<Skeleton className='h-6 w-6' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-6 w-32' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-6 w-24' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-6 w-20 rounded-full' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-6 w-40' />
					</TableCell>
					<TableCell className='text-right'>
						<div className='flex justify-end gap-2'>
							<Skeleton className='h-11 w-11 rounded-full' />
							<Skeleton className='h-11 w-11 rounded-full' />
						</div>
					</TableCell>
				</TableRow>
			))}
		</>
	)
}
