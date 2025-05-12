interface FixedNavProps {
	show: boolean
	navItems: { name: string; id: string }[]
	activeItem: string
	setActiveItem: (item: string) => void
	scrollToSection: (id: string) => void
}

export default function FixedNav({
	show,
	navItems,
	activeItem,
	setActiveItem,
	scrollToSection,
}: FixedNavProps) {
	if (!show) return null

	return (
		<div className='fixed top-5 flex items-center justify-center left-0 right-0 z-50 transition-all duration-300 slide-down'>
			<div className='hidden bg-browse-blue/90 backdrop-blur-sm lg:block p-2 w-auto rounded-[8px] border border-[#FFFFFF4D] fade-in'>
				<ul className='flex space-x-3'>
					{navItems.map(item => (
						<li key={item.name}>
							<button
								onClick={() => {
									setActiveItem(item.name)
									scrollToSection(item.id)
								}}
								className={`px-3 cursor-pointer sm:px-4 lg:px-5 py-[6px] text-sm sm:text-base font-medium rounded-md transition-all duration-200 ease-in-out ${
									activeItem === item.name
										? 'bg-white/20 text-white font-medium scale-105'
										: 'text-white hover:bg-white/10'
								}`}
							>
								{item.name}
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
