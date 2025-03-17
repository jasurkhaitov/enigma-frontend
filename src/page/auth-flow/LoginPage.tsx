import { useEffect } from 'react'
import Login from '../../components/auth/Login'
import AuthHeader from '../../components/shared/AuthHeader'
import Carousel from '../../components/shared/Carousel'
import TermsAgreement from '../../components/terms/TermsAgreement'

export default function LoginPage() {
	useEffect(() => {
		document.title = 'Log in to access your account, explore your data, and continue working seamlessly.'
	}, [])

	return (
		<div className='w-full h-screen flex items-center gap-0'>
			<div className='w-full md:px-10 lg:w-1/2 flex items-center justify-center h-screen px-4'>
				<div className='flex flex-col items-start justify-between gap-6 w-full max-w-xl mx-auto overflow-hidden'>
					<AuthHeader
						title='Log In'
						desc='Log in to access your account, explore your data, and continue working seamlessly.'
					/>

					<Login />

					<TermsAgreement />
				</div>
			</div>
			<div className="w-1/2 md:px-10 hidden lg:flex items-center justify-center bg-[url('./assets/web/background-auth.webp')] bg-cover bg-center bg-no-repeat h-screen px-4">
				<Carousel />
			</div>
		</div>
	)
}
