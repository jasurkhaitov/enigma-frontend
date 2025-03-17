import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { InputOTPPattern } from './InputOTP'

interface VerifyProps {
  path: 'login' | 'register'
}

export default function Verify({ path }: VerifyProps) {
  const navigate = useNavigate()
  const FAKE_CODE = '123456'

  const [timeLeft, setTimeLeft] = useState(10)
  const [isResendDisabled, setIsResendDisabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [otpValue, setOtpValue] = useState('')
  const [verificationStatus, setVerificationStatus] = useState({
    error: false,
    success: false,
    message: ''
  })

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setIsResendDisabled(false)
    }
  }, [timeLeft])

  const handleResendCode = () => {
    setIsLoading(true)
    setTimeout(() => {
      setTimeLeft(59)
      setIsResendDisabled(true)
      setIsLoading(false)
      setVerificationStatus({
        error: false,
        success: true,
        message: 'Verification code sent successfully! (Fake Code: 123456)'
      })
      setTimeout(() => {
        setVerificationStatus(prev => ({ ...prev, success: false, message: '' }))
      }, 3000)
    }, 1000)
  }

  const handleVerify = () => {
    if (otpValue === FAKE_CODE) {
      setVerificationStatus({ error: false, success: true, message: 'Verification successful!' })
      setTimeout(() => {
        navigate(path === 'login' ? '/reset-password' : '/')
      }, 1000)
    } else {
      setVerificationStatus({ error: true, success: false, message: 'Entered code is incorrect. Please try again.' })
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
          <span className="text-xs sm:text-sm">{verificationStatus.message}</span>
        </div>
      )}
      {verificationStatus.success && (
        <div className='flex items-center gap-2 mt-2 text-green-500 text-sm'>
          <CheckCircle size={16} />
          <span className="text-xs sm:text-sm">{verificationStatus.message}</span>
        </div>
      )}
      <div className='mt-4 sm:mt-5 flex flex-wrap items-center gap-2 sm:gap-0'>
        <p className='font-normal text-xs sm:text-sm leading-6 text-gray-text'>
          Didn't receive a code?
        </p>
        {isResendDisabled ? (
          <div className='ml-0 sm:ml-2 px-3 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-600'>
            {timeLeft < 10 ? `0:0${timeLeft}` : `0:${timeLeft}`}
          </div>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className='ml-0 sm:ml-2 text-primary hover:text-primary/80 flex items-center gap-1 h-8 px-2 sm:px-3 text-xs sm:text-sm'
            onClick={handleResendCode}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <RefreshCw size={14} className="animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <RefreshCw size={14} />
                <span>Resend Code</span>
              </>
            )}
          </Button>
        )}
      </div>
      <div className='flex items-center justify-between gap-2 mt-4 sm:mt-5'>
        <Button
          variant='outline'
          className='w-1/3 flex items-center justify-center text-xs sm:text-sm h-10'
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={16} className="mr-1" />
          <span>Back</span>
        </Button>
        <Button
          variant='default'
          className='w-2/3 inline'
          onClick={handleVerify}
          disabled={otpValue.length < 6}
        >
          Verify
        </Button>
      </div>
    </div>
  )
}
