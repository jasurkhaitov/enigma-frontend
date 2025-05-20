import { Link, useNavigate } from 'react-router'
import BrendLogo from '../ui/icons/BrendLogo'
import { Button } from '../ui/button'
import { Icons } from '../ui/icons/IconSvg'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import NavbarMenu from './NavbarMenu'
import Logout from '../auth/logout/Logout'

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto'

		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [isMenuOpen])

	return (
		<div className='sticky top-0 border-b bg-white border-disabled-bg shadow-sm z-50'>
			<div className='max-w-[1280px] m-auto px-4 py-3 flex justify-between items-center'>
				<BrendLogo />

				<div className='hidden md:flex items-center space-x-8'>
					{/* <Link to='/settings' className='font-medium text-[16px] text-gray-700 hover:text-gray-900 transition-colors'> Settings</Link> */}

					<Link
						to='/jobs'
						className='font-medium text-[16px] text-gray-700 hover:text-gray-900 transition-colors'
					>
						History
					</Link>

					<Logout />

					<Button
						className='flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors'
						onClick={() => navigate('/dashboard', { replace: true })}
					>
						<Icons.Pulse />
						<span>Create Reconcile</span>
					</Button>
				</div>

				<button
					type='button'
					className='md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none'
					aria-controls='mobile-menu'
					aria-expanded={isMenuOpen}
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
					<span className='sr-only'>Open main menu</span>
					{isMenuOpen ? (
						<X className='block h-6 w-6' />
					) : (
						<Menu className='block h-6 w-6' />
					)}
				</button>
			</div>

			<NavbarMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
		</div>
	)
}
