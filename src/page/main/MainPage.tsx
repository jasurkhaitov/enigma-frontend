import { useEffect } from 'react'
import Navbar from '../../components/shared/Navbar'
import UploadManagementTab from '@/components/main/UploadManagemenTab'
import Footer from '@/components/shared/Footer'

export default function MainPage() {
  useEffect(() => {
    document.title = 'Enigma - Compare Text and Word Documents'
  }, [])
  
  return (
    <div className='w-full min-h-screen'>
      <div className='fixed top-0 left-0 w-full z-10'>
        <Navbar />
      </div>
      <div className='w-full min-h-screen pt-16 px-4 sm:px-6 md:px-8 block sm:flex sm:items-center sm:justify-center mt-8 sm:mt-0'>
        <UploadManagementTab />
      </div>

      <Footer termPage='' />
    </div>
  )
}