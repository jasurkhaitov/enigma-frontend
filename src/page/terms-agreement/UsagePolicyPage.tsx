import { useContext } from 'react'
import Footer from '../../components/shared/Footer'
import NavbarWithoutAuth from '../../components/shared/NavbarWithoutAuth'
import UsagePolicy from '@/components/terms/UsagePolicy'
import { MyGlobalContext } from '@/hooks/useContext'
import Navbar from '@/components/shared/Navbar'

export default function UsagePolicyPage() {
	const { login } = useContext(MyGlobalContext)

	return (
		<div className='flex flex-col min-h-screen'>
			<header className='w-full'>
				{login ? <Navbar /> : <NavbarWithoutAuth />}
			</header>

			<main className='flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12'>
				<div className='rounded-lg overflow-hidden'>
					<div className='px-4 sm:px-6 md:px-8 py-6 md:py-8'>
						<UsagePolicy />
					</div>
				</div>
			</main>

			<footer className='mt-auto w-full'>
				<Footer termPage={'UsagePolicy'} />
			</footer>
		</div>
	)
}
