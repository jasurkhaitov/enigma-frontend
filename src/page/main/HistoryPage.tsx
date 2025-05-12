import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import HistoryTable from '../../components/history/HistoryTable'
import Navbar from '../../components/shared/Navbar'
import { ItemsPerPageSelector } from '@/components/history/ItemsPerPageSelector'

export default function HistoryPage() {
	const [searchParams, setSearchParams] = useSearchParams()
	const itemsPerPageParam = searchParams.get('items_per_page')

	const [itemsPerPage, setItemsPerPage] = useState(
		itemsPerPageParam ? parseInt(itemsPerPageParam, 10) : 10
	)

	useEffect(() => {
		document.title = 'Document Upload History'
	}, [])

	const handleItemsPerPageChange = (newItemsPerPage: number) => {
		setItemsPerPage(newItemsPerPage)
		const params = new URLSearchParams(searchParams)
		params.set('items_per_page', newItemsPerPage.toString())
		setSearchParams(params, { replace: true })
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
					<ItemsPerPageSelector
						itemsPerPage={itemsPerPage}
						onItemsPerPageChange={handleItemsPerPageChange}
					/>
				</div>
				<HistoryTable
					defaultItemsPerPage={itemsPerPage}
					onItemsPerPageChange={handleItemsPerPageChange}
				/>
			</div>
		</>
	)
}
