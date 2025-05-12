import { useLoginMutation } from '@/service/authApi'
import { useAppSelector, useAppDispatch } from '@/store'
import { Link, useNavigate } from 'react-router-dom'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { setAccessToken } from '@/reducer/authSlice'
import { toast } from 'sonner'
import { errorMsg } from '@/typescript/type'
import UsernameField from './fields/UsernameField'
import PasswordField from './fields/PasswordField'
import { Loader } from 'lucide-react'

const Login = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { email, password, emailError, passwordError } = useAppSelector(
		state => state.auth
	)
	const [login, { isLoading }] = useLoginMutation()

	const handleLogin = async () => {
		if (!email) {
			toast.error('Please enter your username')
			return
		}
		if (!password) {
			toast.error('Please enter your password')
			return
		}
		if (emailError) {
			toast.error(emailError || 'Invalid username format')
			return
		}
		if (passwordError) {
			toast.error(passwordError || 'Invalid password format')
			return
		}
		if (!emailError && !passwordError && email && password) {
			try {
				const response = await login({ username: email, password }).unwrap()
				if (response) {
					toast.success('Login successful !')
					dispatch(setAccessToken(response.access_token))
					navigate('/dashboard')
				}
			} catch (error: unknown) {
				if (typeof error === 'object' && error !== null && 'data' in error) {
					const err = error as errorMsg
					toast.error(err.data.detail)
				} else {
					toast.error('An unexpected error occurred')
				}
			}
		}
	}

	return (
		<div className='w-full space-y-6 relative'>
			<UsernameField />
			<PasswordField />
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-2'>
					<input
						id='remember-me'
						name='remember-me'
						type='checkbox'
						className='w-4 h-4 text-primary border-gray-300 focus:outline-0 rounded'
					/>
					<Label htmlFor='remember-me'>Remember me</Label>
				</div>
				<Link
					to={'/verify'}
					state={{ path: 'login' }}
					className='font-normal cursor-pointer text-[14px] leading-[16px] tracking-[0%] underline decoration-solid text-checkbox-bg'
				>
					Forgot password?
				</Link>
			</div>
			<div className='space-y-2'>
				<Button
					onClick={handleLogin}
					variant='default'
					className='w-full justify-center'
					disabled={isLoading}
				>
					{isLoading ? (
						<>
							<Loader className='mr-1 w-5 animate-spin' />
							Logging in...
						</>
					) : (
						'Login'
					)}
				</Button>
				<Button
					variant='outline'
					className='w-full justify-center'
					onClick={() => navigate('/register')}
				>
					Create Account
				</Button>
			</div>
		</div>
	)
}

export default Login
