import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { Icons } from '../ui/icons/IconSvg'
import { History, Settings, X } from 'lucide-react'
import BrendLogo from '../ui/icons/BrendLogo'

interface MenuBarProps {
	isMenuOpen: boolean
	setIsMenuOpen: (open: boolean) => void
}
export default function NavbarMenu({
	isMenuOpen,
	setIsMenuOpen,
}: MenuBarProps) {
	const navigate = useNavigate()
	return (
		<>
			<div
				className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out md:hidden ${
					isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
				}`}
				onClick={() => setIsMenuOpen(false)}
			></div>

			<div
				className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-out md:hidden ${
					isMenuOpen ? 'translate-x-0' : 'translate-x-full'
				}`}
			>
				<div className='flex px-4 py-3 justify-between items-center border-b border-light-gray'>
					<BrendLogo />
					<button
						onClick={() => setIsMenuOpen(false)}
						className='p-2 rounded-full hover:bg-gray-100'
					>
						<X className='h-5 w-5' />
					</button>
				</div>

				<div className='p-5 space-y-6'>
					<Link
						to='/settings'
						className='flex items-center space-x-2 text-gray-700 hover:text-gray-900 font-medium'
						onClick={() => setIsMenuOpen(false)}
					>
						<Settings className='h-5 w-5' />
						<span>Settings</span>
					</Link>

					<Link
						to='/jobs'
						className='flex items-center space-x-2 text-gray-700 hover:text-gray-900 font-medium'
						onClick={() => setIsMenuOpen(false)}
					>
						<History className='h-5 w-5' />
						<span>History</span>
					</Link>

					<div className='pt-4 border-t border-disabled-bg'>
						<Button
							className='w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors'
							onClick={() => {
								setIsMenuOpen(false)
								navigate('/')
							}}
						>
							<Icons.Pulse />
							<span>Create Comparison</span>
						</Button>
					</div>
				</div>
			</div>
		</>
	)
}
