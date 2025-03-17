import { PageNavigator } from './PageNavigator'

interface PaginationHistoryProps {
	currentPage: number
	totalPages: number
	hasMore: boolean
	onPageChange: (page: number) => void
	itemsPerPage: number
	onItemsPerPageChange: (itemsPerPage: number) => void
}

export function PaginationHistory({
	currentPage,
	totalPages,
	hasMore,
	onPageChange,
}: PaginationHistoryProps) {
	return (
		<PageNavigator
			currentPage={currentPage}
			totalPages={totalPages}
			hasMore={hasMore}
			onPageChange={onPageChange}
		/>
	)
}
