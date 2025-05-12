import notFoundImg from '../../assets/web/notFound.webp'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/shared/Navbar'
import { ArrowLeft, Home } from 'lucide-react'
import Badge from '../../components/ui/badge'

export default function NotFoundPage() {
	useEffect(() => {
		document.title = "The page you're looking for doesn't exist"
	}, [])

	return (
		<div className='w-full min-h-screen'>
			<div className='fixed top-0 left-0 w-full z-10'>
				<Navbar />
			</div>

			<div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 flex items-center justify-center min-h-screen'>
				<div className='w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center'>
					<div className='order-2 md:order-1 flex justify-center'>
						<img
							loading='lazy'
							className='w-full max-w-sm sm:max-w-md md:max-w-full object-cover object-center rounded-lg'
							alt='Page not found illustration'
							src={notFoundImg}
						/>
					</div>

					<div className='order-1 md:order-2 text-center md:text-left'>
						<Badge variant='failed'>Error 404</Badge>

						<h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 my-3'>
							Page Not Found
						</h1>

						<p className='text-base sm:text-lg text-gray-600 mb-8 max-w-md md:max-w-lg mx-auto md:mx-0'>
							The page you are looking for doesn't exist or has been moved.
							Please check the URL or navigate back to the homepage.
						</p>

						<div className='flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center md:justify-start'>
							<Link
								to='/dashboard'
								className='inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors'
							>
								<Home size={18} />
								Back to Home
							</Link>

							<button
								onClick={() => window.history.back()}
								className='inline-flex items-center cursor-pointer justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors'
							>
								<ArrowLeft size={18} />
								Go Back
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
