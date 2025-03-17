//! Padding: from p-3 to px-[12px] py-[8px]
//! font-normal -> font-medium
//! font-[16px] -> font-sm

import React, { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'

interface SelectProps {
	options: string[]
	className?: string
	onChange?: (value: string) => void
}

const Select: React.FC<SelectProps> = ({
	options = [],
	className,
	onChange,
	...props
}) => {
	const [selected, setSelected] = useState<string>(options[0] || '')
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		setIsOpen(prev => !prev)
	}

	const handleSelect = (option: string) => {
		setSelected(option)
		setIsOpen(false)
		if (onChange) {
			onChange(option)
		}
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<div
			className={`relative inline-block ${className || ''}`}
			{...props}
			ref={dropdownRef}
		>
			<button
				onClick={toggleDropdown}
				className='flex items-center justify-between w-40 px-[12px] py-[8px] border border-disabled-bg focus:border-light-gray active:border-light-gray rounded-[8px] shadow-xs bg-white text-sm text-text font-normal focus:outline-none'
			>
				{selected}
				<ChevronDown
					className={`ml-2 transform text-disabled-text transition-transform duration-300 ${
						isOpen ? 'rotate-180' : ''
					}`}
					width={16}
				/>
			</button>

			<div
				className={`absolute left-0 right-0 mt-2 overflow-hidden transition-all duration-300 rounded-lg border border-cool-gray shadow-md bg-white backdrop-blur-lg ${
					isOpen
						? 'max-h-60 opacity-100 transform translate-y-0 scale-100'
						: 'max-h-0 opacity-0 transform -translate-y-2 scale-95 pointer-events-none'
				}`}
			>
				<ul className='overflow-auto max-h-60 py-2'>
					{options.map((option, index) => (
						<li
							key={index}
							className='px-4 py-3 text-[14px] text-dark-gray cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:text-near-black rounded-md'
							onClick={() => handleSelect(option)}
						>
							{option}
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export { Select }
