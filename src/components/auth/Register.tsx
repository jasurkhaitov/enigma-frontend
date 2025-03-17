import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import EmailField from './fields/EmailField'
import RegisterField from './fields/RegisterField'

const Register = () => {
	const navigate = useNavigate()
	return (
		<div className='w-full space-y-6 relative'>
			<RegisterField />
			<EmailField />

			<div className='space-y-2'>
				<Button
					variant='default'
					onClick={() => navigate('/verify', { replace: true, state: {path: 'register'} })}
					className='w-full justify-center'
				>
					Sign Up
				</Button>
				<Button
					variant='outline'
					onClick={() => navigate('/login')}
					className='w-full justify-center'
				>
					Log In
				</Button>
			</div>
		</div>
	)
}

export default Register
