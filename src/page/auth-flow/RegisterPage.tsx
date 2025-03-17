import { useEffect } from 'react'
import AuthHeader from '../../components/shared/AuthHeader'
import Carousel from '../../components/shared/Carousel'
import TermsAgreement from '../../components/terms/TermsAgreement'
import Register from '@/components/auth/Register'

export default function RegisterPage() {
	useEffect(() => {
		document.title =
			'Create an account to unlock powerful features, manage your data, and get started effortlessly'
	}, [])

	return (
		<div className='w-full h-screen flex items-center gap-0'>
			<div className='w-full md:px-10 lg:w-1/2 flex items-center justify-center h-screen px-4'>
				<div className='flex flex-col items-start justify-between gap-6 max-w-xl w-full mx-auto overflow-hidden'>
					<AuthHeader
						title='Sign Up'
						desc='Create an account to unlock powerful features, manage your data, and get started effortlessly.'
					/>

					<Register />

					<TermsAgreement />
				</div>
			</div>
			<div className="w-1/2 md:px-10 hidden lg:flex items-center justify-center bg-[url('./assets/web/background-auth.webp')] bg-cover bg-center bg-no-repeat h-screen px-4">
				<Carousel />
			</div>
		</div>
	)
}
