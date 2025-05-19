import Navbar from '../../components/shared/Navbar'
import ChangeEmail from '@/components/settings/ChangeEmail'
import ChangePassword from '@/components/settings/ChangePassword'

export default function SettingsPage() {

  return (
    <>
      <div className='sticky top-0 left-0 w-full z-10'>
        <Navbar />
      </div>
      <div className='max-w-[1280px] m-auto p-4 py-6 sm:py-10'>
        <h2 className='font-semibold text-xl sm:text-2xl text-text mb-4 sm:mb-8'>
          Settings
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
          <ChangeEmail/>
          <ChangePassword/>
        </div>
      </div>
    </>
  )
}