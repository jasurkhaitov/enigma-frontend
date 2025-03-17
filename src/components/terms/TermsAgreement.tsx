import { Link } from 'react-router-dom'

const TermsAgreement = () => {
	return (
		<div className='font-normal text-xs leading-4 tracking-normal text-center underline-offset-auto decoration-solid text-disabled-text max-w-sm m-auto flex items-center mb-2'>
			<p>
				By continuing, you agree to the app <br />
				<Link to='/consumer-terms' className='text-primary underline'>
					Consumer Terms
				</Link>{' '}
				and{' '}
				<Link to='/usage-policy' className='text-primary underline'>
					Usage Policy
				</Link>
				, and <br /> acknowledge their{' '}
				<Link to='/privacy-policy' className='text-primary underline'>
					Privacy Policy
				</Link>
			</p>
		</div>
	)
}

export default TermsAgreement
