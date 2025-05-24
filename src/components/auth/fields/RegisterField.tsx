import { ChangeEvent } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tooltip } from '@/components/ui/tooltip'
import { useAppDispatch, useAppSelector } from '@/store'
import { setName, setNameFocused } from '@/reducer/authSlice'

export default function RegisterField() {
  const dispatch = useAppDispatch()
  const { 
    name,
    nameError, 
    isNameFocused,
  } = useAppSelector(state => state.auth)
  
  return (
    <div className='flex sm:flex-row flex-col items-center gap-6 sm:gap-4'>
      <div className='flex flex-col w-full'>
        <Label htmlFor='nameReg' required>
          Name
        </Label>
        <Tooltip 
          text={nameError} 
          isVisible={isNameFocused && !!nameError} 
          position='top' 
          variant='error'
        >
          <Input
            type='text'
            id='nameReg'
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setName(e.target.value))}
            onFocus={() => dispatch(setNameFocused(true))}
            onBlur={() => dispatch(setNameFocused(false))}
            placeholder='Enter your name'
            className='relative mt-2'
            hasError={!!nameError}
          />
        </Tooltip>
      </div>
    </div>
  )
}