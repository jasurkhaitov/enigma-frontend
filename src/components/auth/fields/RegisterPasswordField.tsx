import { ChangeEvent } from 'react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Tooltip } from '../../ui/tooltip';
import { useAppDispatch, useAppSelector } from '@/store'
import { setRegPassword, setRegPasswordFocused, toggleShowRegPassword } from '@/reducer/authSlice'
import EyeIcon from '../EyeIcon'

const RegisterPasswordField = () => {
  const dispatch = useAppDispatch();
  const {
    regPassword,
    showRegPassword,
    isRegPasswordFocused,
    regPasswordError
  } = useAppSelector(state => state.auth);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setRegPassword(e.target.value));
  };

  return (
    <div className='space-y-2 relative flex flex-col'>
      <Label htmlFor='regPassword' required>
        Password
      </Label>
      <Tooltip
        text={regPasswordError}
        isVisible={isRegPasswordFocused && !!regPasswordError}
        position='bottom'
        variant='error'
      >
        <div className='relative flex items-center w-full'>
          <Input
            id='regPassword'
            type={showRegPassword ? 'text' : 'password'}
            placeholder='Enter your password'
            value={regPassword}
            onChange={handlePasswordChange}
            onFocus={() => dispatch(setRegPasswordFocused(true))}
            onBlur={() => dispatch(setRegPasswordFocused(false))}
            hasError={!!regPasswordError}
            className='w-full'
          />
          <EyeIcon
            showPassword={showRegPassword}
            togglePassword={() => dispatch(toggleShowRegPassword())}
          />
        </div>
      </Tooltip>
    </div>
  );
};

export default RegisterPasswordField;