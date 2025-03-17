import { PaginationItem, PaginationLink } from '@/components/ui/pagination'

interface RenderPageNumbersProps {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
}

export function RenderPageNumbers({ currentPage, totalPages, onPageChange }: RenderPageNumbersProps) {
	const pages = []
	const maxPagesToShow = 3

	let startPage = Math.max(1, currentPage - 1)
	const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)

	if (endPage - startPage < maxPagesToShow - 1) {
		startPage = Math.max(1, endPage - maxPagesToShow + 1)
	}

	for (let i = startPage; i <= endPage; i++) {
		pages.push(
			<PaginationItem key={i}>
				<PaginationLink
					isActive={i === currentPage}
					onClick={e => {
						e.preventDefault()
						onPageChange(i)
					}}
				>
					{i}
				</PaginationLink>
			</PaginationItem>
		)
	}

	return <>{pages}</>
}
