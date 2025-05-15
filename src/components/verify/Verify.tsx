import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { InputOTPPattern } from './InputOTP'
import { useVerifyCodeMutation } from '@/service/authApi'

interface VerifyProps {
  path: 'login' | 'register'
}

export default function Verify({ path }: VerifyProps) {
  const navigate = useNavigate()
  const [otpValue, setOtpValue] = useState('')
  const [verificationStatus, setVerificationStatus] = useState({
    error: false,
    success: false,
    message: '',
  })

  const [verifyCode, { isLoading: isVerifying }] = useVerifyCodeMutation()

  const handleVerify = async () => {
    try {
      const res = await verifyCode({ code: otpValue }).unwrap()

      console.log(res);
      
      setVerificationStatus({
        error: false,
        success: true,
        message: 'Verification successful!',
      })
      
      setTimeout(() => {
        navigate(path === 'login' ? '/reset-password' : '/dashboard', {
          state: true,
        })
      }, 1000)
    } catch (error) {
      setVerificationStatus({
        error: true,
        success: false,
        message: 'Entered code is incorrect. Please try again.',
      })
			console.log(error);
			
    }
  }

  const handleOtpChange = (value: string) => {
    setOtpValue(value)
    if (verificationStatus.error) {
      setVerificationStatus({ error: false, success: false, message: '' })
    }
  }

  return (
    <div className='w-full'>
      <Label required>Verification Code</Label>
      <div className='mt-2'>
        <InputOTPPattern onChange={handleOtpChange} value={otpValue} />
      </div>
      {verificationStatus.error && (
        <div className='flex items-center gap-2 mt-2 text-red-500 text-sm'>
          <AlertCircle size={16} />
          <span className='text-xs sm:text-sm'>
            {verificationStatus.message}
          </span>
        </div>
      )}
      {verificationStatus.success && (
        <div className='flex items-center gap-2 mt-2 text-green-500 text-sm'>
          <CheckCircle size={16} />
          <span className='text-xs sm:text-sm'>
            {verificationStatus.message}
          </span>
        </div>
      )}
      <div className='flex items-center justify-between gap-2 mt-4 sm:mt-5'>
        <Button
          variant='outline'
          className='w-1/3 flex items-center justify-center text-xs sm:text-sm h-10'
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={16} className='mr-1' />
          <span>Back</span>
        </Button>
        <Button
          variant='default'
          className='w-2/3 inline'
          onClick={handleVerify}
          disabled={otpValue.length < 6 || isVerifying}
        >
          {isVerifying ? 'Verifying...' : 'Verify'}
        </Button>
      </div>
    </div>
  )
}