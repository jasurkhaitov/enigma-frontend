import { useDownloadTaskMutation } from '@/service/jobsApi'
import { Button } from '../ui/button'
import { Icons } from '../ui/icons/IconSvg'
import { Loader, TimerIcon } from 'lucide-react'

interface TaskInformationProps {
  loading: boolean
  id: string
  time: string | number | Date
  name: string
}

export default function TaskInformation({ loading, id, time, name }: TaskInformationProps) {
  const [downloadTask] = useDownloadTaskMutation()
  const handleDownload = async () => {
    try {
      const response = await downloadTask(id).unwrap()
      console.log(response);
    
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  return (
    <div className='w-full max-w-lg mx-auto text-center flex flex-col items-center justify-center min-h-[400px]'>
      {loading ? (
        <div className='flex flex-col items-center gap-4'>
          <Loader className='animate-spin text-primary' size={64} />
          <p className='text-gray-600 text-lg font-medium'>Processing your document...</p>
        </div>
      ) : (
        <>
          <Icons.PdfIcon size={64} />
          <p className='mt-4 text-base font-medium leading-6 text-secondary-low'>{name}</p>
          <p className='text-xl font-semibold leading-6 text-text mt-6 mb-2'>Processing Complete!</p>
          <p className='text-gray-text text-center leading-6 text-base'>
            Your document is ready. Review the changes and download your file.
          </p>

          <div className='my-4 w-full text-center flex items-center justify-center gap-2'>
            <TimerIcon className='text-gray-700' size={20}/>
            <p className='text-gray-700'>
              {new Date(time).toLocaleString()}
            </p>
          </div>

          <Button onClick={handleDownload} className='inline'>
            Download File
          </Button>
        </>
      )}
    </div>
  )
}
