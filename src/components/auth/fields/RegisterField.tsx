import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tooltip } from '@/components/ui/tooltip'

export default function RegisterField() {
	return (
		<div className='flex sm:flex-row flex-col items-center gap-6 sm:gap-4'>
			<div className='flex flex-col w-full'>
				<Label htmlFor='nameReg' required>
					Full name
				</Label>
				<Tooltip
					text={'Error Message'}
					isVisible={false}
					position='top'
					variant='error'
				>
					<Input
						type='text'
						id='nameReg'
						placeholder='Enter your name'
						className='relative mt-2'
					/>
				</Tooltip>
			</div>

			<div className='flex flex-col w-full'>
				<Label htmlFor='phoneNUmber' required>
					Phone number
				</Label>
				<Tooltip
					text={'Error Message'}
					isVisible={false}
					position='top'
					variant='error'
				>
					<Input
						type='text'
						id='phoneNUmber'
						placeholder='Enter your phone number'
						className='relative mt-2'
					/>
				</Tooltip>
			</div>
		</div>
	)
}
