import * as React from 'react'

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>

const checkboxStyles = {
	base: 'w-[24px] h-[24px] rounded-[4px] border-[2px] transition-all cursor-pointer disabled:cursor-not-allowed flex items-center justify-center border-disabled-bg duration-150 ease-linear',
	checked:
		'bg-checkbox-bg border-[1.5px] border-checkbox-bg flex items-center justify-center',
	disabled: 'bg-background-light border-disabled-bg',
	disabledChecked:
		'bg-background-light border-[1.5px] border-disabled-bg flex items-center justify-center',
	checkmark:
		'w-[13px] h-[9px] border-white border-[3px] border-solid border-t-0 border-l-0 transform rotate-45 top-[7px] left-[6px] absolute',
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
	({ className = '', ...props }, ref) => {
		return (
			<div className='relative inline-flex'>
				<input
					type='checkbox'
					ref={ref}
					className={`${checkboxStyles.base} ${
						props.checked
							? props.disabled
								? checkboxStyles.disabledChecked
								: checkboxStyles.checked
							: props.disabled
							? checkboxStyles.disabled
							: ''
					} ${className}`}
					{...props}
				/>
				{props.checked && !props.disabled && (
					<div className={checkboxStyles.checkmark} />
				)}
			</div>
		)
	}
)

Checkbox.displayName = 'Checkbox'
