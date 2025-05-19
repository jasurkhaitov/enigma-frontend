import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { Icons } from '../ui/icons/IconSvg'
import { History, LogOutIcon, X } from 'lucide-react'
import BrendLogo from '../ui/icons/BrendLogo'
import { useState } from 'react'
import { useLogout } from '@/hooks/useLogout'

interface MenuBarProps {
	isMenuOpen: boolean
	setIsMenuOpen: (open: boolean) => void
}

export default function NavbarMenu({
	isMenuOpen,
	setIsMenuOpen,
}: MenuBarProps) {
	const navigate = useNavigate()
	const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

	const logout = useLogout()

	const handleLogout = () => {
		logout()
	}

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
						to='/jobs'
						className='flex items-center space-x-2 text-gray-700 hover:text-gray-900 font-medium'
						onClick={() => setIsMenuOpen(false)}
					>
						<History className='h-5 w-5' />
						<span>History</span>
					</Link>

					{/* Enhanced logout section */}
					<div className='relative'>
						{showLogoutConfirm ? (
							<div className='bg-white rounded-lg shadow-md p-4 border border-gray-200'>
								<p className='text-sm text-gray-600 mb-3'>
									Are you sure you want to log out?
								</p>
								<div className='flex space-x-2'>
									<Button
										variant='outline'
										size='sm'
										className='w-1/2 text-gray-700'
										onClick={() => setShowLogoutConfirm(false)}
									>
										Cancel
									</Button>
									<Button size='sm' className='w-1/2' onClick={handleLogout}>
										Logout
									</Button>
								</div>
							</div>
						) : (
							<Button
								variant='ghost'
								className='w-full justify-start px-2 text-gray-700 hover:text-red-600 hover:bg-red-50 group transition-all duration-200'
								onClick={() => setShowLogoutConfirm(true)}
							>
								<LogOutIcon className='h-5 w-5 mr-2 group-hover:text-red-600' />
								<span>Logout</span>
							</Button>
						)}
					</div>

					<div className='pt-4 border-t border-disabled-bg'>
						<Button
							className='w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors'
							onClick={() => {
								setIsMenuOpen(false)
								navigate('/dashboard')
							}}
						>
							<Icons.Pulse />
							<span>Create Reconcile</span>
						</Button>
					</div>
				</div>
			</div>
		</>
	)
}
