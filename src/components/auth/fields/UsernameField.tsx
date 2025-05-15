import { setUsername, setUsernameFocused } from '@/reducer/authSlice'
import { useAppDispatch, useAppSelector } from '@/store'
import { ChangeEvent } from 'react'
import { Tooltip } from '../../ui/tooltip'
import { Label } from '../../ui/label'
import { Input } from '../../ui/input'

const UsernameField = () => {
  const dispatch = useAppDispatch()
  const { username, isUsernameFocused, usernameError } = useAppSelector(
    state => state.auth
  )

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setUsername(e.target.value))
  }

  return (
    <div className='flex flex-col'>
      <Label htmlFor='username' required>
        Username
      </Label>
      <Tooltip
        text={usernameError}
        isVisible={isUsernameFocused && !!usernameError}
        position='top'
        variant='error'
      >
        <Input
          type='text'
          id='username'
          placeholder='Enter your username'
          value={username}
          onChange={handleUsernameChange}
          onFocus={() => dispatch(setUsernameFocused(true))}
          onBlur={() => dispatch(setUsernameFocused(false))}
          className='relative mt-2'
          hasError={!!usernameError}
        />
      </Tooltip>
    </div>
  )
}

export default UsernameField
