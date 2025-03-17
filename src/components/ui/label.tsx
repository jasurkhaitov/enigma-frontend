import * as React from 'react'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
	required?: boolean
}

function Label({
	children,
	htmlFor,
	required = false,
	className = '',
	...props
}: LabelProps) {
	return (
		<label
			htmlFor={htmlFor}
			className={` inline text-[14px] font-normal leading-[16px] tracking-[0%] text-text ${className}`}
			{...props}
		>
			{children}
			{required && <span className='text-error ml-1 font-bold'>*</span>}
		</label>
	)
}

export { Label }
