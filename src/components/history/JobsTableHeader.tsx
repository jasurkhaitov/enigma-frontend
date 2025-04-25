import { TableHead, TableRow } from '@/components/ui/table'

export function JobsTableHeader() {
	return (
		<TableRow>
			<TableHead className='w-[70px]'>ID</TableHead>
			<TableHead className='w-[200px]'>Date</TableHead>
			<TableHead className='w-[220px]'>Name</TableHead>
			<TableHead className='w-[100px]'>Languages</TableHead>
			<TableHead className='w-[100px]'>Status</TableHead>
			<TableHead>Processed File</TableHead>
			<TableHead className='w-[100px] text-right'>Actions</TableHead>
		</TableRow>
	)
}
