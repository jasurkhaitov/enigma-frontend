import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'

interface AuthButtonProps {
  isLoading: boolean
  isAuthenticated: boolean
  onClick: () => void
}

export default function AuthButton({ isLoading, isAuthenticated, onClick }: AuthButtonProps) {
  return (
    <Button
      variant={'white'}
      size={'lg'}
      className='hidden active:scale-95 w-48 lg:flex items-center justify-center'
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <Loader className='animate-spin' /> : isAuthenticated ? 'Go to Dashboard' : 'Start Free Trial'}
    </Button>
  )
}
