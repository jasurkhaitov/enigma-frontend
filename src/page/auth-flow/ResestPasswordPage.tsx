import { useEffect } from 'react'
import AuthHeader from '../../components/shared/AuthHeader'
import Carousel from '../../components/shared/Carousel'
import ResetPassword from '@/components/reset-password/ResetPassword'
import { Navigate, useLocation } from 'react-router-dom'

export default function ResestPasswordPage() {
	useEffect(() => {
		document.title =
			'Create a secure password to protect your account and access all features.'
	}, [])

	const location = useLocation()

	if (!location.state) return <Navigate to='/login' replace />

	return (
		<div className='w-full h-screen flex items-center gap-0'>
			<div className='w-full md:px-10 lg:w-1/2 flex items-center justify-center h-screen px-4'>
				<div className='flex flex-col items-start justify-between gap-6 w-full max-w-xl mx-auto overflow-hidden'>
					<AuthHeader
						title='Create Password'
						desc='Create a secure password to protect your account and access all features.'
					/>

					<ResetPassword />
				</div>
			</div>
			<div className="w-1/2 md:px-10 hidden lg:flex items-center justify-center bg-[url('./assets/web/background-auth.webp')] bg-cover bg-center bg-no-repeat h-screen px-4">
				<Carousel />
			</div>
		</div>
	)
}
