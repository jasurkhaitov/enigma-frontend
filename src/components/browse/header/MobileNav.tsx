import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

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
	handleAuthAction,
}: MobileNavProps) {
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
					<Button
						variant={'white'}
						size={'lg'}
						className='m-auto w-48'
						onClick={() => {
							onClose()
							handleAuthAction()
						}}
						disabled={isLoading}
					>
						{isLoading
							? '...'
							: isAuthenticated
							? 'Go to Dashboard'
							: 'Start Free Trial'}
					</Button>
				</div>
			</div>
		</div>
	)
}
