import { useState } from 'react'
import { useSearchParams } from 'react-router'
import HistoryTable from '../../components/history/HistoryTable'
import Navbar from '../../components/shared/Navbar'
import { ItemsPerPageSelector } from '@/components/history/ItemsPerPageSelector'
import { Button } from '@/components/ui/button'
import { RotateCcw } from 'lucide-react'
import { useGetJobsQuery } from '@/service/jobsApi'

export default function HistoryPage() {
	const [searchParams, setSearchParams] = useSearchParams()
	const itemsPerPageParam = searchParams.get('items_per_page')
	const pageParam = searchParams.get('page')
	
	const [itemsPerPage, setItemsPerPage] = useState(
		itemsPerPageParam ? parseInt(itemsPerPageParam, 10) : 10
	)
	
	const [page] = useState(
		pageParam ? parseInt(pageParam, 10) : 1
	)

	const handleItemsPerPageChange = (newItemsPerPage: number) => {
		setItemsPerPage(newItemsPerPage)
		const params = new URLSearchParams(searchParams)
		params.set('items_per_page', newItemsPerPage.toString())
		setSearchParams(params, { replace: true })
	}

	const { refetch } = useGetJobsQuery({
		page,
		items_per_page: itemsPerPage,
	}, {
		skip: false // Ensure the query starts immediately
	})

	const handleRefetch = () => {
		refetch()
	}

	return (
		<>
			<div className='sticky top-0 left-0 w-full z-10'>
				<Navbar />
			</div>
			<div className='max-w-[1600px] m-auto p-4 py-10'>
				<div className='flex flex-col sm:flex-row gap-5 justify-between mb-8'>
					<h2 className='font-semibold text-2xl text-text'>
						Comparison History
					</h2>
					<div className='flex items-center gap-3'>
						<Button onClick={handleRefetch}>
							<RotateCcw className='w-5 h-5 text-sm' /> Refetch history
						</Button>
						<ItemsPerPageSelector
							itemsPerPage={itemsPerPage}
							onItemsPerPageChange={handleItemsPerPageChange}
						/>
					</div>
				</div>
				<HistoryTable
					defaultItemsPerPage={itemsPerPage}
					onItemsPerPageChange={handleItemsPerPageChange}
				/>
			</div>
		</>
	)
}