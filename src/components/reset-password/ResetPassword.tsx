import { useState } from 'react'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import PasswordValidation from '../shared/PasswordValidation'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

export default function ResetPassword() {
	const [showNewPassword, setShowNewPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	const navigate = useNavigate()

	return (
		<div>
			<div className='flex flex-col relative'>
				<Label htmlFor='new' required>
					New Password
				</Label>
				<Input
					type={showNewPassword ? 'text' : 'password'}
					id='new'
					placeholder='Enter new password'
					className='relative mt-2 pr-10'
				/>
				<button
					type='button'
					className='absolute right-3 top-10'
					onClick={() => setShowNewPassword(!showNewPassword)}
				>
					{showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
				</button>
			</div>

			<div className='flex flex-col my-6 relative'>
				<Label htmlFor='confirm' required>
					Confirm Password
				</Label>
				<Input
					type={showConfirmPassword ? 'text' : 'password'}
					id='confirm'
					placeholder='Confirm password'
					className='relative mt-2 pr-10'
				/>
				<button
					type='button'
					className='absolute right-3 top-10'
					onClick={() => setShowConfirmPassword(!showConfirmPassword)}
				>
					{showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
				</button>
			</div>

			<PasswordValidation />

			<div className='flex items-center justify-between gap-2 mt-4 sm:mt-5'>
				<Button
					variant='outline'
					className='w-1/3 flex items-center justify-center text-xs sm:text-sm h-10'
					onClick={() => window.history.back()}
				>
					<ArrowLeft size={16} className='mr-1' />
					<span>Back</span>
				</Button>
				<Button onClick={() => navigate('/')} variant='default' className='w-2/3 inline'>
					Continue
				</Button>
			</div>
		</div>
	)
}
