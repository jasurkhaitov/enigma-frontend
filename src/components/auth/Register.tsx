import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import EmailField from './fields/EmailField'
import RegisterField from './fields/RegisterField'
import PasswordField from './fields/PasswordField'
import { useAppDispatch, useAppSelector } from '@/store'
import { toast } from 'sonner'
import { useRegisterMutation } from '@/service/authApi'
import { Loader } from 'lucide-react'
import { validateForm } from '@/reducer/authSlice'

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { 
    name, 
    username, 
    email, 
    password, 
    nameError, 
    usernameError, 
    emailError, 
    passwordError 
  } = useAppSelector(state => state.auth)
  
  const [register, { isLoading }] = useRegisterMutation()
  
  const handleRegister = async () => {
    dispatch(validateForm())
    
    // Check if any fields are empty
    if (!name || !username || !email || !password) {
      toast.error('Please fill all fields')
      return
    }
    
    // Check if there are any validation errors
    if (nameError || usernameError || emailError || passwordError) {
      toast.error('Please fix form errors')
      return
    }
    
    try {
      const response = await register({ name, username, email, password }).unwrap()
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
      <PasswordField />
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