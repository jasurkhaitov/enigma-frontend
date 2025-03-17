import { Button } from '../ui/button'
import { Icons } from '../ui/icons/IconSvg'
import { useEffect, useState } from 'react'

interface ErrorModalProps {
  isOpen: boolean
  onClose: () => void
  onRetry?: () => void
}

export default function ErrorModal({ isOpen, onClose, onRetry }: ErrorModalProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
    } else {
      setIsAnimating(false)
    }
  }, [isOpen])
  
  if (!isOpen && !isAnimating) return null
  
  const handleAnimationEnd = () => {
    if (!isOpen) {
      setIsAnimating(false)
    }
  }
  
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    }
    onClose();
  }
  
  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center bg-black/60 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div 
        className={`bg-white max-w-sm rounded-lg p-6 text-center transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        onTransitionEnd={handleAnimationEnd}
      >
        <div className='flex justify-center mb-3'>
          <Icons.ErrorMessageIcon />
        </div>
        <h2 className='text-lg font-semibold text-text mb-3'>
          File Upload Error
        </h2>
        <p className='text-gray-text text-base mb-4'>
          Something went wrong while uploading your file. Please check the
          format and try again.
        </p>
        <div className='flex flex-col gap-2 justify-center'>
          <Button onClick={handleRetry} className='inline'>
            Try again
          </Button>
        </div>
      </div>
    </div>
  )
}