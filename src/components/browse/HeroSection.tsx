import { Button } from '../ui/button'
import { Loader } from 'lucide-react'

export default function HeroSection({ isLoading, isAuthenticated, handleAuthAction }: {isLoading: boolean, isAuthenticated: boolean, handleAuthAction: ()=>void}) {
	return (
		<div className='w-full h-full flex items-center justify-center my-24 sm:my-40'>
			<div className='flex items-center justify-center flex-col gap-2 sm:gap-3 text-center'>
				<h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white'>
					Brush up legal documents
				</h1>	

				<p className='text-sm sm:text-base font-medium text-white px-4'>
					Save time while working with word documents
				</p>

				<Button
					className='shadow-[0px_3px_23.1px_0px_#FFFFFFC2] mt-4 sm:mt-6 lg:mt-9 w-48 flex item-center justify-center'
					variant={'white'}
					size={'whiteMode'}
					onClick={() => {
						handleAuthAction()
					}}
					disabled={isLoading}
				>
					{isLoading ? (
						<Loader className='animate-spin' />
					) : isAuthenticated ? (
						'Go to Dashboard'
					) : (
						'Get Started Free'
					)}
				</Button>
			</div>
		</div>
	)
}