import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

interface ItemsPerPageSelectorProps {
	itemsPerPage: number
	onItemsPerPageChange: (itemsPerPage: number) => void
}

export function ItemsPerPageSelector({
	itemsPerPage,
	onItemsPerPageChange,
}: ItemsPerPageSelectorProps) {
	return (
		<Select
			value={itemsPerPage.toString()}
			onValueChange={value => onItemsPerPageChange(parseInt(value, 10))}
		>
			<SelectTrigger className='w-32 h-9'>
				<SelectValue placeholder={itemsPerPage.toString()} />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='10'>10 / page</SelectItem>
				<SelectItem value='20'>20 / page</SelectItem>
				<SelectItem value='50'>50 / page</SelectItem>
			</SelectContent>
		</Select>
	)
}
