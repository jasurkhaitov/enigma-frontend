import { useNavigate } from 'react-router'
import { Button } from '../ui/button'
import EmailField from './fields/EmailField'
import RegisterField from './fields/RegisterField'
import { useAppDispatch, useAppSelector } from '@/store'
import { toast } from 'sonner'
import { useRegisterMutation } from '@/service/authApi'
import { Loader } from 'lucide-react'
import { validateForm } from '@/reducer/authSlice'
import RegisterPasswordField from './fields/RegisterPasswordField'

const Register = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const {
		name,
		email,
		regPassword,
		nameError,
		emailError,
		regPasswordError,
	} = useAppSelector(state => state.auth)

	const [register, { isLoading }] = useRegisterMutation()

	const handleRegister = async () => {
		dispatch(validateForm())

		if (!name || !email || !regPassword) {
			toast.error('Please fill all fields')
			return
		}

		if (nameError || emailError || regPasswordError) {
			toast.error('Please fix form errors')
			return
		}

		try {
			const response = await register({
				name,
				email,
				password: regPassword,
			}).unwrap()
			if (response) {
				toast.success('Account created successfully!')
				navigate('/verify', { replace: true, state: { path: 'register' } })
			}
		} catch (error) {
			// toast.error(error?.data?.detail || 'Registration failed')
			console.log(error)
		}
	}

	return (
		<div className='w-full space-y-6 relative'>
			<RegisterField />
			<EmailField />
			<RegisterPasswordField />
			<div className='space-y-2'>
				<Button
					variant='default'
					onClick={handleRegister}
					className='w-full justify-center'
					disabled={isLoading}
				>
					{isLoading ? (
						<>
							<Loader className='mr-1 w-5 animate-spin' />
							Signing up...
						</>
					) : (
						'Sign Up'
					)}
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
