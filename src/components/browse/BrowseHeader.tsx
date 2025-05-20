import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useNavigate } from 'react-router'
import BrendLogo from '../ui/icons/BrendLogo'
import HeroSection from './HeroSection'
import FixedNav from './header/FixedNav'
import DesktopNav from './header/DesktopNav'
import AuthButton from './header/AuthButton'
import MobileNavOverlay from './header/MobileNavOverlay'
import MobileNav from './header/MobileNav'
import useAuth from '@/hooks/useAuth'

export default function BrowseHeader() {
	const [activeItem, setActiveItem] = useState('Home')
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const [showFixedNav, setShowFixedNav] = useState(false)

	const { isAuthenticated, isLoading } = useAuth()
	const navigate = useNavigate()

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const navItems = [
		{ name: 'Home', id: 'home' },
		{ name: 'Dashboard', id: 'dashboard' },
		{ name: 'About us', id: 'about-us' },
		{ name: 'Possibilities', id: 'possibilities' },
	]

	useEffect(() => {
		document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'auto'
		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [mobileMenuOpen])

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY + 100

			setShowFixedNav(window.scrollY > 150)

			for (let i = navItems.length - 1; i >= 0; i--) {
				const section = document.getElementById(navItems[i].id)
				if (section && section.offsetTop <= scrollPosition) {
					setActiveItem(navItems[i].name)
					break
				}
			}
		}

		window.addEventListener('scroll', handleScroll)
		handleScroll()

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [navItems])

	const scrollToSection = (id: string) => {
		const element = document.getElementById(id)
		if (element) {
			const headerOffset = 50
			const elementPosition = element.getBoundingClientRect().top
			const offsetPosition = elementPosition + window.pageYOffset - headerOffset

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth',
			})
		}
	}

	const handleAuthAction = () => {
		navigate(isAuthenticated ? '/dashboard' : '/login')
	}

	return (
		<>
			<FixedNav
				show={showFixedNav}
				navItems={navItems}
				activeItem={activeItem}
				setActiveItem={setActiveItem}
				scrollToSection={scrollToSection}
			/>

			<div className='w-full h-full p-3 sm:p-4 lg:p-5 bg-[linear-gradient(180deg,_#575DEB_0%,_#313585_100%)] rounded-xl sm:rounded-2xl lg:rounded-4xl'>
				<div className='max-w-[1000px] m-auto flex items-center justify-between'>
					<div className='w-48'>
						<BrendLogo url='/' color='white' />
					</div>

					<div className='lg:hidden'>
						<button
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							className='text-white p-2 z-50 relative'
							aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
						>
							{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>

					<div className='hidden lg:block p-2 rounded-[8px] border border-[#FFFFFF4D]'>
						<DesktopNav
							navItems={navItems}
							activeItem={activeItem}
							setActiveItem={setActiveItem}
							scrollToSection={scrollToSection}
						/>
					</div>

					<AuthButton
						isLoading={isLoading}
						isAuthenticated={isAuthenticated}
						onClick={handleAuthAction}
					/>
				</div>

				<MobileNavOverlay
					isOpen={mobileMenuOpen}
					onClose={() => setMobileMenuOpen(false)}
				/>

				<MobileNav
					isOpen={mobileMenuOpen}
					navItems={navItems}
					activeItem={activeItem}
					setActiveItem={setActiveItem}
					scrollToSection={scrollToSection}
					onClose={() => setMobileMenuOpen(false)}
					isLoading={isLoading}
					isAuthenticated={isAuthenticated}
					handleAuthAction={handleAuthAction}
				/>

				<HeroSection
					isLoading={isLoading}
					isAuthenticated={isAuthenticated}
					handleAuthAction={handleAuthAction}
				/>
			</div>
		</>
	)
}
