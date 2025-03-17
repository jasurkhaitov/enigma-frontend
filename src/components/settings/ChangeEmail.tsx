import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

export default function ChangeEmail() {
	const [email, setEmail] = useState('john.doe@gmail.com')

	return (
		<div className='border-2 border-disabled-bg p-5 sm:p-8 rounded'>
			<h2 className='text-text leading-6 text-[20px] font-semibold'>
				Change Email
			</h2>

			<div className='flex flex-col my-6'>
				<Label htmlFor='emails' required>
					Email
				</Label>
				<Input
					type='email'
					id='emails'
					placeholder='Enter your Email'
					className='relative mt-2'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>

			<Button>Update Email</Button>
		</div>
	)
}
