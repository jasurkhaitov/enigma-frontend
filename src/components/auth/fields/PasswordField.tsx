import { ChangeEvent } from 'react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Tooltip } from '../../ui/tooltip';
import { useAppDispatch, useAppSelector } from '@/store'
import { setPassword, setPasswordFocused, toggleShowPassword } from '@/reducer/authSlice'
import EyeIcon from '../EyeIcon'

const PasswordField = () => {
  const dispatch = useAppDispatch();
  const { 
    password, 
    showPassword, 
    isPasswordFocused, 
    passwordError 
  } = useAppSelector(state => state.auth);
  
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(e.target.value));
  };

  return (
    <div className='space-y-2 relative flex flex-col'>
      <Label htmlFor='password' required>
        Password
      </Label>
      <Tooltip
        text={passwordError}
        isVisible={isPasswordFocused && !!passwordError}
        position='bottom'
        variant='error'
      >
        <div className='relative flex items-center w-full'>
          <Input
            id='password'
            type={showPassword ? 'text' : 'password'}
            placeholder='Enter your password'
            value={password}
            onChange={handlePasswordChange}
            onFocus={() => dispatch(setPasswordFocused(true))}
            onBlur={() => dispatch(setPasswordFocused(false))}
            hasError={!!passwordError}
            className='w-full'
          />
          <EyeIcon
            showPassword={showPassword}
            togglePassword={() => dispatch(toggleShowPassword())}
          />
        </div>
      </Tooltip>
    </div>
  );
};

export default PasswordField;