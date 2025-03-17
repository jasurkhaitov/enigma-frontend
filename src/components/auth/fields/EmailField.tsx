import { Tooltip } from '../../ui/tooltip'
import { Label } from '../../ui/label'
import { Input } from '../../ui/input'

const EmailField = () => {

	return (
		<div className='flex flex-col'>
			<Label htmlFor='emailRegister' required>
				E-mail
			</Label>
			<Tooltip
				text={'Error Message'}
				isVisible={false}
				position='top'
				variant='error'
			>
				<Input
					type='email'
					id='emailRegister'
					placeholder='Enter your email'
					className='relative mt-2'
				/>
			</Tooltip>
		</div>
	)
}

export default EmailField;