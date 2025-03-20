import { useEffect } from 'react'
import Navbar from '../../components/shared/Navbar'
import ChatDemo from '@/components/chat/ChatDemo'

export default function ChatPage() {
	useEffect(() => {
		document.title = 'Chat Translation'
	}, [])

	return (
		<>
			<div className='fixed top-0 left-0 w-full z-10'>
				<Navbar />
			</div>
			<div className='w-full pt-6 h-screen px-4 sm:px-6 md:px-8 block sm:flex sm:items-center sm:justify-center mt-8 sm:mt-0'>
        <ChatDemo />
      </div>
		</>
	)
}
