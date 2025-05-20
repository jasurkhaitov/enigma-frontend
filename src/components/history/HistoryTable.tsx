import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { useGetJobsQuery } from '@/service/jobsApi'
import { PaginationHistory } from './PaginationHistory'
import { Table, TableBody, TableHeader } from '@/components/ui/table'
import { JobsTableHeader } from './JobsTableHeader'
import { LoadingTableRow } from './LoadingTableRow'
import { JobsTableContent } from './JobsTableContent'
import { ErrorDisplay } from './ErrorDisplay'
import useAuth from '@/hooks/useAuth'

export interface Job {
	id: string
	user_id?: string
	job_id: string
	master_lang: string
	slave_lang: string
	name: string
	status: string
	processed_path: string
	created_at: string
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
	const { isAuthenticated, checkAuthStatus } = useAuth()

	const pageParam = searchParams.get('page')
	const itemsPerPageParam = searchParams.get('items_per_page')

	const [itemsPerPage, setItemsPerPage] = useState(
		itemsPerPageParam ? parseInt(itemsPerPageParam, 10) : defaultItemsPerPage
	)
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
		items_per_page: itemsPerPage,
	})

	const exampleData: Job[] = [
		{
			id: '1151ddce-b1e6-45fd-9cbe-c8431029647a',
			user_id: '3b29fbb3-ef59-47f1-9e90-6c970b2ea9d4',
			job_id: 'cb1c29c94a5348a9a597559a2ac5f515',
			created_at: '2025-04-22T14:40:06.771552Z',
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
		const verifyAuth = async () => {
			if (!isAuthenticated) {
				const authResult = await checkAuthStatus()
				if (authResult) {
					refetch()
				}
			}
		}

		verifyAuth()
	}, [isAuthenticated, checkAuthStatus, refetch])

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
		if (isPageInitialized && data) {
			let correctPage = page

			if (totalPages > 0 && correctPage > totalPages) {
				correctPage = totalPages
				setPage(correctPage)
			}

			const params = new URLSearchParams(searchParams)
			params.set('page', correctPage.toString())
			params.set('items_per_page', itemsPerPage.toString())
			setSearchParams(params, { replace: true })
		}
	}, [
		page,
		itemsPerPage,
		totalPages,
		isPageInitialized,
		searchParams,
		setSearchParams,
		data,
	])

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

		if (page > newTotalPages && newTotalPages > 0) {
			setPage(newTotalPages)
		} else {
			setPage(1)
		}

		onItemsPerPageChange(newItemsPerPage)

		const params = new URLSearchParams(searchParams)
		params.set('items_per_page', newItemsPerPage.toString())
		params.set('page', '1')

		setSearchParams(params, { replace: true })
		refetch()
	}

	if (error) return <ErrorDisplay error={error} onRetry={() => refetch()} />

	return (
		<>
			{jobsData.length === 0 ? (
				<div className='flex flex-col items-center justify-center py-12 px-4 bg-gray-50 rounded-lg border border-gray-200'>
					<div className='bg-gray-100 p-4 rounded-full mb-4'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-12 w-12 text-gray-400'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={1.5}
								d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
							/>
						</svg>
					</div>
					<h3 className='text-lg font-medium text-gray-900 mb-1'>
						No jobs found
					</h3>
					<p className='text-gray-500 text-center mb-4'>
						There are currently no jobs available to display.
					</p>
				</div>
			) : (
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
			)}
		</>
	)
}
