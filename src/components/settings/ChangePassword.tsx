import { useState } from 'react'
import PasswordValidation from '../shared/PasswordValidation'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Eye, EyeOff } from 'lucide-react'

export default function ChangePassword() {
	const [showNewPassword, setShowNewPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	return (
		<div className='border-2 border-disabled-bg p-5 sm:p-8 rounded'>
			<h2 className='text-text leading-6 text-[20px] font-semibold'>
				Change Password
			</h2>

			<div className='flex flex-col my-6 relative'>
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

			<div className='flex flex-col mb-6 relative'>
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

			<Button className='mt-6'>Update Password</Button>
		</div>
	)
}
