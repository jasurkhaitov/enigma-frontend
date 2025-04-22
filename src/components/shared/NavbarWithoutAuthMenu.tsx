import { Link, useNavigate } from 'react-router-dom'
import BrendLogo from '../ui/icons/BrendLogo'
import { CircleHelp, User, UserPlus, X } from 'lucide-react'
import { Button } from '../ui/button'

interface MobileMenuProps {
	isOpen: boolean
	onClose: () => void
}

export default function NavbarWithoutAuthMenu({
	isOpen,
	onClose,
}: MobileMenuProps) {
	const navigate = useNavigate()
	const handleCreate = () => {
		navigate('/register')
		onClose()
	}
	return (
		<>
			<div
				className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out md:hidden ${
					isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
				}`}
				onClick={onClose}
			></div>

			<div
				className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-out md:hidden ${
					isOpen ? 'translate-x-0' : 'translate-x-full'
				}`}
			>
				<div className='flex px-4 py-3 justify-between items-center border-b border-light-gray'>
					<BrendLogo />
					<button
						onClick={onClose}
						className='p-2 rounded-full hover:bg-gray-100'
					>
						<X className='h-5 w-5' />
					</button>
				</div>
				<div className='p-5 space-y-6'>
					<a
						href='https://t.me/jasurkhaitov'
						target='_blank'
						className='flex items-center space-x-2 text-gray-700 hover:text-gray-900 font-medium'
						onClick={onClose}
					>
						<CircleHelp className='h-5 w-5' />
						<span>Help & Support</span>
					</a>
					<Link
						to='/login'
						className='flex items-center space-x-2 text-gray-700 hover:text-gray-900 font-medium'
						onClick={onClose}
					>
						<User className='h-5 w-5' />
						<span>Login</span>
					</Link>
					<div className='pt-4 border-t border-disabled-bg'>
						<Button
							className='w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors'
							onClick={handleCreate}
						>
							<UserPlus className='h-5 w-5' />
							<span>Create Account</span>
						</Button>
					</div>
				</div>
			</div>
		</>
	)
}
