import { Navigate, useLocation } from 'react-router'
import AuthHeader from '../../components/shared/AuthHeader'
import Carousel from '../../components/shared/Carousel'
import Verify from '@/components/verify/Verify'

export default function VerifyPage() {
	const location = useLocation()
	const state = location.state || {}

	if (!state.path || (state.path !== 'login' && state.path !== 'register')) {
		if (state.path === 'register') {
			return <Navigate to='/register' replace />
		}
		return <Navigate to='/login' replace />
	}

	return (
		<div className='w-full h-screen flex items-center gap-0'>
			<div className='w-full md:px-10 lg:w-1/2 flex items-center justify-center h-screen px-4'>
				<div className='flex flex-col items-start justify-between gap-6 w-full max-w-xl mx-auto overflow-hidden'>
					<AuthHeader
						title='Verify Yourself'
						desc="We've sent a 6-digit code to your email. Enter it below to verify your account."
					/>

					<Verify path={state.path} />
				</div>
			</div>
			<div className="w-1/2 md:px-10 hidden lg:flex items-center justify-center bg-[url('./assets/web/background-auth.webp')] bg-cover bg-center bg-no-repeat h-screen px-4">
				<Carousel />
			</div>
		</div>
	)
}
