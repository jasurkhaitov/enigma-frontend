import { setEmail, setEmailFocused } from '@/reducer/authSlice'
import { useAppDispatch, useAppSelector } from '@/store'
import { ChangeEvent } from 'react'
import { Tooltip } from '../../ui/tooltip'
import { Label } from '../../ui/label'
import { Input } from '../../ui/input'

const UsernameField = () => {
	const dispatch = useAppDispatch()
	const { email, isEmailFocused, emailError } = useAppSelector(
		state => state.auth
	)

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(setEmail(e.target.value))
	}

	return (
		<div className='flex flex-col'>
			<Label htmlFor='email' required>
				Username
			</Label>
			<Tooltip
				text={emailError}
				isVisible={isEmailFocused && !!emailError}
				position='top'
				variant='error'
			>
				<Input
					type='username'
					id='email'
					placeholder='Enter your username'
					value={email}
					onChange={handleEmailChange}
					onFocus={() => dispatch(setEmailFocused(true))}
					onBlur={() => dispatch(setEmailFocused(false))}
					className='relative mt-2'
					hasError={!!emailError}
				/>
			</Tooltip>
		</div>
	)
}

export default UsernameField
