import * as React from 'react'

function Radio({
	className,
	variant = 'default',
	checked,
	onChange,
	...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
	variant?: 'default' | 'circle'
}) {
	return (
		<label className={`relative flex items-center cursor-pointer ${className}`}>
			<input
				type='radio'
				checked={checked}
				onChange={onChange}
				className='hidden'
				{...props}
			/>
			<div
				className={`relative flex items-center justify-center transition-all rounded-full border 
        ${
					variant === 'circle'
						? 'w-[24px] h-[24px] border-1'
						: 'w-[18px] h-[18px] border-1'
				} 
        ${
					checked
						? 'bg-primary border-primary'
						: 'bg-white border-2 border-disabled-bg'
				}`}
			>
				{checked && (
					<div
						className={`absolute bg-white rounded-full 
            ${variant === 'circle' ? 'w-[10px] h-[10px]' : 'w-[8px] h-[8px]'}`}
					/>
				)}
			</div>
		</label>
	)
}

export { Radio }
