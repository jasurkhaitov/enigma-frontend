import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'
import { RenderPageNumbers } from './RenderPageNumbers'

interface PageNavigatorProps {
	currentPage: number
	totalPages: number
	hasMore: boolean
	onPageChange: (page: number) => void
}

export function PageNavigator({ currentPage, totalPages, hasMore, onPageChange }: PageNavigatorProps) {
	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						onClick={e => {
							e.preventDefault()
							if (currentPage > 1) {
								onPageChange(currentPage - 1)
							}
						}}
						aria-disabled={currentPage <= 1}
						className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
					/>
				</PaginationItem>

				<RenderPageNumbers currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />

				{totalPages > 3 && currentPage < totalPages - 1 && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}

				<PaginationItem>
					<PaginationNext
						onClick={e => {
							e.preventDefault()
							if (hasMore && currentPage < totalPages) {
								onPageChange(currentPage + 1)
							}
						}}
						aria-disabled={!hasMore || currentPage >= totalPages}
						className={
							!hasMore || currentPage >= totalPages
								? 'pointer-events-none opacity-50'
								: ''
						}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}
