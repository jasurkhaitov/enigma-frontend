import * as React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
	hasError?: boolean
	isAlert?: boolean
}

function Input({
	className = '',
	type = 'text',
	placeholder = '',
	value,
	onChange,
	disabled,
	hasError,
	isAlert,
	label,
	...props
}: InputProps) {
	let baseStyles = `
    w-full rounded-[8px] border-2 border-disabled-bg px-[12px] py-[12px] gap-[4px]
    placeholder:text-disabled-text text-[16px] font-[400] leading-[24px] tracking-[0%]
    outline-none transition-all
  `

	if (hasError) {
		baseStyles =
			baseStyles.replace(/border-\[.*?\]/, '').replace(/border-2/, '') +
			' border-2 border-error'
	} else if (isAlert) {
		baseStyles += ' border-2 border-warning'
	} else if (disabled) {
		baseStyles +=
			' border-disabled-bg bg-background-light placeholder:text-disabled-text cursor-not-allowed'
	} else {
		baseStyles += ' text-text'
	}

	return (
		<input
			id={label}
			type={type}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			autoComplete='off'
			disabled={disabled}
			className={`${baseStyles} ${label} ${
				!disabled && !hasError && !isAlert
					? 'focus:border-2 focus:border-primary-dark focus:text-checkbox-bg focus:gap-[8px]'
					: ''
			} ${className}`}
			{...props}
		/>
	)
}

export { Input }
