import * as React from 'react'

function Toggle({
	className,
	variant = 'default',
	...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: 'default' | 'expand'
}) {
	const [toggled, setToggled] = React.useState(false)
	const toggleSwitch = () => setToggled(!toggled)

	return (
		<button
			onClick={toggleSwitch}
			className={`relative flex items-center transition-all rounded-full cursor-pointer
       ${variant === 'expand' ? 'w-[48px] h-[28px]' : 'w-[48px] h-[28px]'}
       ${toggled ? 'bg-checkbox-bg' : 'bg-disabled-bg'}
       ${className}`}
			{...props}
		>
			<div
				className={`absolute transition-all bg-white shadow-md rounded-full
         ${
						variant === 'expand'
							? 'w-[32px] h-[24px] left-[2px]'
							: 'w-[24px] h-[24px] left-[2px]'
					}
         ${
						toggled
							? variant === 'expand'
								? 'translate-x-[12px]'
								: 'translate-x-[20px]'
							: 'translate-x-0'
					}`}
			/>
		</button>
	)
}

export { Toggle }
