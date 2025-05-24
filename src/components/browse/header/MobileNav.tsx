import { Button } from '@/components/ui/button'
import { Loader, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface MobileNavProps {
	isOpen: boolean
	navItems: { name: string; id: string }[]
	activeItem: string
	setActiveItem: (item: string) => void
	scrollToSection: (id: string) => void
	onClose: () => void
	isLoading: boolean
	isAuthenticated: boolean
	handleAuthAction: () => void
}

export default function MobileNav({
	isOpen,
	navItems,
	activeItem,
	setActiveItem,
	scrollToSection,
	onClose,
	isLoading,
	isAuthenticated,
}: MobileNavProps) {
	const navigate = useNavigate()
	return (
		<div
			className={`fixed top-0 right-0 h-full max-w-80 w-full bg-browse-blue z-50 shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden ${
				isOpen ? 'translate-x-0' : 'translate-x-full'
			}`}
		>
			<div className='p-5 flex flex-col h-full'>
				<div className='flex justify-end mb-6'>
					<button onClick={onClose} className='text-white p-1'>
						<X size={24} />
					</button>
				</div>

				<ul className='flex flex-col space-y-4'>
					{navItems.map(item => (
						<li key={item.name}>
							<button
								onClick={() => {
									setActiveItem(item.name)
									scrollToSection(item.id)
									onClose()
								}}
								className={`w-full px-4 py-3 text-base font-medium rounded-md transition-all duration-200 ${
									activeItem === item.name
										? 'bg-white/20 text-white font-medium'
										: 'text-white hover:bg-white/10'
								}`}
							>
								{item.name}
							</button>
						</li>
					))}
				</ul>

				<div className='mt-auto py-6'>
					{isLoading ? (
						<Button
							disabled
							className='flex items-center gap-2 opacity-80 m-auto w-48'
						>
							<Loader className='animate-spin h-4 w-4' />
						</Button>
					) : isAuthenticated ? (
						<Button
							onClick={() => {
								onClose()
							}}
							className='bg-green-600 hover:bg-green-700 text-white transition-all rounded-full m-auto w-48'
						>
							Go to Dashboard
						</Button>
					) : (
						<div className='flex p-1 bg-white rounded-md w-full m-auto shadow-sm items-center justify-center'>
							<Button
								variant='ghost'
								className='rounded-md text-center inline w-full px-5 text-gray-800 hover:bg-white transition-all'
								onClick={() => {
									onClose()
									navigate('/login')
								}}
							>
								Log In
							</Button>
							<Button
								className='rounded-md text-center inline w-full px-5 text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all'
								onClick={() => {
									onClose()

									navigate('/register')
								}}
							>
								Sign Up
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
