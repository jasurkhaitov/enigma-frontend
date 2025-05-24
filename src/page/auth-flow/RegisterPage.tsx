import BrendLogo from '@/components/ui/icons/BrendLogo'
import AuthHeader from '../../components/shared/AuthHeader'
import Carousel from '../../components/shared/Carousel'
import TermsAgreement from '../../components/terms/TermsAgreement'
import Register from '@/components/auth/Register'

export default function RegisterPage() {

	return (
		<div className='w-full h-screen flex items-center gap-0'>
			<div className='w-full md:px-10 lg:w-1/2 flex items-center justify-center h-screen px-4'>
				<div className='flex relative flex-col items-start justify-between gap-6 max-w-xl w-full mx-auto overflow-hidden'>
					<AuthHeader
						title='Sign Up'
						desc='Create an account to unlock powerful features, manage your data, and get started effortlessly.'
					/>

					<Register />

					<TermsAgreement />

					<div className='fixed top-0 left-0 w-full lg:w-1/2 border-b border-cool-gray'>
											<div className='p-5 w-1'>
												<BrendLogo url='/' />
											</div>
										</div>
				</div>
			</div>
			<div className="w-1/2 md:px-10 hidden lg:flex items-center justify-center bg-[url('./assets/web/background-auth.webp')] bg-cover bg-center bg-no-repeat h-screen px-4">
				<Carousel />
			</div>
		</div>
	)
}
