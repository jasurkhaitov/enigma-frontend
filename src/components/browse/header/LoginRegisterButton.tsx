import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface AuthButtonProps {
	isLoading: boolean
	isAuthenticated: boolean
	onClick: () => void
}

export default function LoginRegisterButton({
	isLoading,
	isAuthenticated,
	onClick,
}: AuthButtonProps) {
	const navigate = useNavigate()
	if (isLoading) {
		return (
			<Button disabled className='flex items-center gap-2 opacity-80'>
				<Loader className='animate-spin h-4 w-4' />
			</Button>
		)
	}

	if (isAuthenticated) {
		return (
			<Button
				onClick={onClick}
				className='bg-green-600 hover:bg-green-700 text-white transition-all rounded-full'
			>
				Go to Dashboard
			</Button>
		)
	}

	return (
		<div className='hidden lg:flex p-1 bg-white border border-gray-300 rounded-full shadow-sm'>
			<Button
				variant='ghost'
				className='rounded-full px-5 text-gray-800 hover:bg-white transition-all'
				onClick={() => navigate('/login')}
			>
				Log In
			</Button>
			<Button
				className='rounded-full px-5 text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all'
				onClick={() => navigate('/register')}
			>
				Sign Up
			</Button>
		</div>
	)
}
