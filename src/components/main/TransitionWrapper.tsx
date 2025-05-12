import React, { ReactNode } from 'react'

interface TransitionWrapperProps {
	className: string
	children: ReactNode
}

const TransitionWrapper: React.FC<TransitionWrapperProps> = ({
	className,
	children,
}) => {
	return <div className={className}>{children}</div>
}

export default TransitionWrapper
