import { CloudAlert } from 'lucide-react'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeFile } from '@/reducer/fileSlice'

interface ErrorModalProps {
  isOpen: boolean
  onClose: () => void
  dropzoneId: 1 | 2
}

export default function ErrorModal({ 
  isOpen, 
  onClose, 
  dropzoneId 
}: ErrorModalProps) {
  const dispatch = useDispatch()
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
    dispatch(removeFile({ dropzoneId }))
    
    onClose()
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
          <CloudAlert className='text-red-500 text-xl w-12 h-12' />
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
          <Button onClick={onClose} variant={'outline'} className='inline'>
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}