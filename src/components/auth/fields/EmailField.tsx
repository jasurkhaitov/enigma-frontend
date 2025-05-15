import { ChangeEvent } from 'react'
import { Tooltip } from '../../ui/tooltip'
import { Label } from '../../ui/label'
import { Input } from '../../ui/input'
import { useAppDispatch, useAppSelector } from '@/store'
import { setEmail, setEmailFocused } from '@/reducer/authSlice'

const EmailField = () => {
  const dispatch = useAppDispatch()
  const { email, emailError, isEmailFocused } = useAppSelector(state => state.auth)

  return (
    <div className='flex flex-col'>
      <Label htmlFor='emailRegister' required>
        E-mail
      </Label>
      <Tooltip
        text={emailError}
        isVisible={isEmailFocused && !!emailError}
        position='top'
        variant='error'
      >
        <Input
          type='email'
          id='emailRegister'
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setEmail(e.target.value))}
          onFocus={() => dispatch(setEmailFocused(true))}
          onBlur={() => dispatch(setEmailFocused(false))}
          placeholder='Enter your email'
          className='relative mt-2'
          hasError={!!emailError}
        />
      </Tooltip>
    </div>
  )
}

export default EmailField