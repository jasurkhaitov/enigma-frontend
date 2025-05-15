import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function AvatarDemo() {
	return (
		<Avatar className=' cursor-pointer'>
			<AvatarImage src='https://cdn-icons-png.flaticon.com/512/9385/9385289.png' alt='@shadcn' />
			<AvatarFallback>CN</AvatarFallback>
		</Avatar>
	)
}
