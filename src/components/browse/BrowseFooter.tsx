import BrendLogo from '../ui/icons/BrendLogo'
import { Link } from 'react-router'

export default function BrowseFooter() {
	const scrollToSection = (id: string) => {
		const element = document.getElementById(id)
		if (element) {
			const headerOffset = 0 // Adjust based on your header height
			const elementPosition = element.getBoundingClientRect().top
			const offsetPosition = elementPosition + window.pageYOffset - headerOffset

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth',
			})
		}
	}

	return (
		<div className='p-6 sm:p-12 lg:p-24 w-full bg-[linear-gradient(180deg,_#575DEB_0%,_#313585_100%)] rounded-t-xl sm:rounded-t-2xl lg:rounded-t-4xl'>
			<div className='max-w-[1000px] m-auto flex flex-col md:flex-row gap-10 md:gap-0 items-start justify-between'>
				<div className='w-full md:w-auto'>
					<div className='mb-6'>
						<BrendLogo url='/' color='white' />
					</div>

					<div className='flex flex-col'>
						<Link
							className='text-sm text-white font-medium mb-2 hover:underline'
							to={'/privacy-policy'}
						>
							Privacy Policy
						</Link>

						<p className='text-sm text-white font-medium'>Public offer</p>
					</div>
				</div>

				<div className='w-full md:w-auto flex flex-col gap-4 md:gap-6 items-start'>
					<h3 className='text-lg sm:text-xl text-white font-bold'>Contacts</h3>

					<div className='flex flex-col gap-2'>
						<a
							href='tel:+998999999999'
							className='text-sm text-white font-medium hover:underline transition'
						>
							+998 99 999 99 99
						</a>
						<a
							href='mailto:bombe@enigmadoc.com'
							className='text-sm text-white font-medium hover:underline transition'
						>
							bombe@enigmadoc.com
						</a>
					</div>
				</div>

				<div className='w-full md:w-auto flex flex-col gap-4 md:gap-6 items-start'>
					<h3 className='text-lg sm:text-xl text-white font-bold'>Menu</h3>

					<ul className='flex flex-col gap-2'>
						<li
							className='text-sm sm:text-base font-medium text-white cursor-pointer hover:underline'
							onClick={() => scrollToSection('home')}
						>
							Home
						</li>
						<li
							className='text-sm sm:text-base font-medium text-white cursor-pointer hover:underline'
							onClick={() => scrollToSection('dashboard')}
						>
							Dashboard
						</li>
						<li
							className='text-sm sm:text-base font-medium text-white cursor-pointer hover:underline'
							onClick={() => scrollToSection('about-us')}
						>
							About us
						</li>
						<li
							className='text-sm sm:text-base font-medium text-white cursor-pointer hover:underline'
							onClick={() => scrollToSection('possibilities')}
						>
							Possibilities
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
