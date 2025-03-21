import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppSelector } from '@/store'
import { useRefreshAuth } from '@/service/refreshAuth'
import { useGetJobsQuery } from '@/service/jobsApi'
import { PaginationHistory } from './PaginationHistory'
import { Table, TableBody, TableHeader } from '@/components/ui/table'
import { JobsTableHeader } from './JobsTableHeader'
import { LoadingTableRow } from './LoadingTableRow'
import { JobsTableContent } from './JobsTableContent'
import { ErrorDisplay } from './ErrorDisplay'

export interface Job {
	id: string
	user_id?: string
	job_id: string
	master_lang: string
	slave_lang: string
	name: string
	status: string
	processed_path: string
}

export type StatusVariantMap = {
	[key: string]: 'processing' | 'done' | 'failed'
}

interface HistoryTableProps {
	defaultItemsPerPage: number
	onItemsPerPageChange: (newItemsPerPage: number) => void
}

export default function HistoryTable({
	defaultItemsPerPage,
	onItemsPerPageChange,
}: HistoryTableProps) {
	const [searchParams, setSearchParams] = useSearchParams()
	const accessToken = useAppSelector(state => state.auth.accessToken)
	const { refreshAccessToken } = useRefreshAuth()

	const pageParam = searchParams.get('page')

	const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage)
	const [page, setPage] = useState(pageParam ? parseInt(pageParam, 10) : 1)
	const [isPageInitialized, setIsPageInitialized] = useState(false)

	const statusVariantMap: StatusVariantMap = {
		processing: 'processing',
		pending: 'processing',
		success: 'done',
		done: 'done',
		failed: 'failed',
		error: 'failed',
	}

	const { data, error, isLoading, refetch } = useGetJobsQuery({
		page,
		items_per_page: defaultItemsPerPage,
	})

	const exampleData: Job[] = [
		{
			id: '1151ddce-b1e6-45fd-9cbe-c8431029647a',
			user_id: '3b29fbb3-ef59-47f1-9e90-6c970b2ea9d4',
			job_id: 'cb1c29c94a5348a9a597559a2ac5f515',
			master_lang: 'en',
			slave_lang: 'ru',
			name: 'asdasd',
			status: 'success',
			processed_path: '/tmp/pro/Personal Statement.pdf',
		},
	]

	const jobsData = data?.data || exampleData
	const totalCount = data?.total_count || 1
	const totalPages = Math.ceil(totalCount / itemsPerPage)

	useEffect(() => {
		const fetchWithToken = async () => {
			if (!accessToken) {
				const result = await refreshAccessToken()
				if (result.success) {
					refetch()
				}
			}
		}
		fetchWithToken()
	}, [accessToken, refreshAccessToken, refetch])

	useEffect(() => {
		if (!isPageInitialized) {
			if (pageParam) {
				const newPage = parseInt(pageParam, 10)
				if (newPage >= 1) {
					setPage(newPage)
				}
			}
			setItemsPerPage(defaultItemsPerPage)
			setIsPageInitialized(true)
		}
	}, [pageParam, defaultItemsPerPage, isPageInitialized])

	useEffect(() => {
		if (isPageInitialized) {
			const params = new URLSearchParams(searchParams)
			params.set('page', page.toString())
			setSearchParams(params, { replace: true })
		}
	}, [page, setSearchParams, searchParams, isPageInitialized])

	useEffect(() => {
		if (isPageInitialized && defaultItemsPerPage !== itemsPerPage) {
			setItemsPerPage(defaultItemsPerPage)

			const newTotalPages = Math.ceil(totalCount / defaultItemsPerPage)

			if (page > newTotalPages && newTotalPages > 0) {
				setPage(newTotalPages)
			}
		}
	}, [defaultItemsPerPage, itemsPerPage, totalCount, page, isPageInitialized])

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
			setPage(newPage)
		}
	}

	const handleItemsPerPageChange = (newItemsPerPage: number) => {
		setItemsPerPage(newItemsPerPage)

		const newTotalPages = Math.ceil(totalCount / newItemsPerPage)

		if (page > newTotalPages) {
			setPage(newTotalPages)
		} else {
			setPage(1)
		}

		onItemsPerPageChange(newItemsPerPage)
		refetch()
	}

	if (error) return <ErrorDisplay error={error} onRetry={() => refetch()} />

	return (
		<div className='w-full rounded-md'>
			<div className='overflow-y-auto'>
				<Table>
					<TableHeader className='bg-white-mode'>
						<JobsTableHeader />
					</TableHeader>
					<TableBody>
						{isLoading ? (
							<LoadingTableRow rowCount={itemsPerPage} />
						) : (
							<JobsTableContent
								jobsData={jobsData}
								page={page}
								itemsPerPage={itemsPerPage}
								statusVariantMap={statusVariantMap}
							/>
						)}
					</TableBody>
				</Table>
			</div>
			<div className='mt-10'>
				<PaginationHistory
					currentPage={page}
					totalPages={totalPages}
					hasMore={data?.has_more || false}
					onPageChange={handlePageChange}
					itemsPerPage={itemsPerPage}
					onItemsPerPageChange={handleItemsPerPageChange}
				/>
			</div>
		</div>
	)
}
