import BrowseFooter from '@/components/browse/BrowseFooter'
import BrowseHeader from '@/components/browse/BrowseHeader'
import BrowseMain from '@/components/browse/BrowseMain'
import BrowsePossibility from '@/components/browse/BrowsePossibility'
import { useEffect } from 'react'

export default function BrowsePage() {
	useEffect(() => {
		document.title = 'Enigma - Verify translations with AI'
	}, [])

	return (
		<div className='w-full'>
			<section id="home" className='max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 m-auto py-10'>
				<BrowseHeader />
			</section>

			<section id="dashboard" className='py-5'>
				
			</section>

			<section id="about-us" className='w-full bg-[linear-gradient(96.43deg,_#575DEB_12.29%,_#313585_104.34%)]'>
				<div className='max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 m-auto py-12 sm:py-16 lg:py-24'>
					<BrowseMain />
				</div>
			</section>

			<section id="possibilities" className='max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 m-auto py-10 sm:py-16 lg:py-20'>
				<BrowsePossibility />
			</section>

			<div className='max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 m-auto mt-4'>
				<BrowseFooter />
			</div>
		</div>
	)
}