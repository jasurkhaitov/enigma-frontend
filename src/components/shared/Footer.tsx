import BrendLogo from '../ui/icons/BrendLogo'
import { Link } from 'react-router'

const Footer = ({ termPage }: { termPage: string }) => {
	return (
		<footer className='bg-white text-gray-800 py-8 px-6 border-t border-gray-300'>
			<div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center'>
				<div className='flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-6 md:mb-0'>
					<BrendLogo />
					<nav className='md:ml-8 flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 text-sm mt-4 md:mt-0'>
						{termPage !== 'PrivacyPolicy' && (
							<Link to='/privacy-policy' className='hover:text-gray-500'>
								Privacy Policy
							</Link>
						)}

						{termPage !== 'ConsumerTerms' && (
							<Link to='/consumer-terms' className='hover:text-gray-500'>
								Consumer Terms
							</Link>
						)}

						{termPage !== 'UsagePolicy' && (
							<Link to='/usage-policy' className='hover:text-gray-500'>
								Usage Policy
							</Link>
						)}
					</nav>
				</div>
				<div className='flex flex-col items-center md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4'>
					<a
						href='mailto:bombe@enigmadoc.com'
						className='text-sm hover:underline text-gray-600'
					>
						bombe@enigmadoc.com
					</a>
				</div>
			</div>
			<div className='max-w-7xl mx-auto mt-6 pt-6 border-t border-gray-300 flex justify-between items-center'>
				<p className='text-sm text-gray-600 w-full text-center md:text-left'>
					© 2025 Enigma LLC. All rights reserved.
				</p>
			</div>
		</footer>
	)
}

export default Footer
