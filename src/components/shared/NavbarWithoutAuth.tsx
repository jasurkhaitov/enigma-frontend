import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import BrendLogo from '../ui/icons/BrendLogo'
import { Button } from '../ui/button'
import { CircleHelp, UserPlus, Menu, X } from 'lucide-react'
import { Tooltip } from '../ui/tooltip'
import NavbarWithoutAuthMenu from './NavbarWithoutAuthMenu'

export default function NavbarWithoutAuth() {
	const [helpTooltipVisible, setHelpTooltipVisible] = useState(false)
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto'
		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [isMenuOpen])

	const handleRegister = () => {
		setIsMenuOpen(!isMenuOpen)
		navigate('/register')
	}

	return (
		<div className='sticky top-0 border-b bg-white border-disabled-bg shadow-xs z-50'>
			<div className='max-w-[1280px] m-auto px-4 py-3 flex justify-between items-center'>
				<BrendLogo />

				<div className='hidden md:flex items-center justify-end gap-6'>
					<Tooltip
						text='Help & Support'
						position='bottom'
						isVisible={helpTooltipVisible}
						className='hover:opacity-80 transition-opacity duration-300 text-center'
					>
						<a
							href='https://t.me/jasurkhaitov'
							target='_blank'
							className='rounded-full p-2 gap-2 font-medium flex items-center text-[16px] leading-6 tracking-normal transition-all duration-150 ease-linear cursor-pointer border-none text-text bg-transparent hover:bg-background-light'
							onMouseEnter={() => setHelpTooltipVisible(true)}
							onMouseLeave={() => setHelpTooltipVisible(false)}
						>
							<CircleHelp />
						</a>
					</Tooltip>
					<Link
						to='/login'
						className='font-medium text-[16px] leading-[24px] tracking-normal text-text hover:underline'
					>
						Login
					</Link>
					<Button className='flex items-center gap-2 whitespace-nowrap ml-2'>
						<UserPlus className='w-5 h-5' />
						Create Account
					</Button>
				</div>

				<button
					type='button'
					className='md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none'
					aria-controls='mobile-menu'
					aria-expanded={isMenuOpen}
					onClick={handleRegister}
				>
					<span className='sr-only'>Open main menu</span>
					{isMenuOpen ? (
						<X className='block h-6 w-6' />
					) : (
						<Menu className='block h-6 w-6' />
					)}
				</button>
			</div>

			<NavbarWithoutAuthMenu
				isOpen={isMenuOpen}
				onClose={() => setIsMenuOpen(false)}
			/>
		</div>
	)
}
