import { Dispatch, SetStateAction } from 'react'

interface DesktopNavProps {
  navItems: { name: string; id: string }[]
  activeItem: string
  setActiveItem: Dispatch<SetStateAction<string>>
  scrollToSection: (id: string) => void
}

export default function DesktopNav({
  navItems,
  activeItem,
  setActiveItem,
  scrollToSection,
}: DesktopNavProps) {
  return (
    <ul className='flex space-x-2'>
      {navItems.map(item => (
        <li key={item.name}>
          <button
            onClick={() => {
              setActiveItem(item.name)
              scrollToSection(item.id)
            }}
            className={`px-3 sm:px-4 lg:px-5 py-[6px] text-sm sm:text-base font-medium cursor-pointer rounded-md transition-all duration-200 ${
              activeItem === item.name
                ? 'bg-white/20 text-white font-medium'
                : 'text-white'
            }`}
          >
            {item.name}
          </button>
        </li>
      ))}
    </ul>
  )
}