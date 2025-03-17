import React from 'react'

interface BadgeProps {
  variant: 'processing' | 'done' | 'failed'
  children: React.ReactNode
}

const baseStyle = 'rounded-full font-semibold text-[16px] leading-6 tracking-normal px-4 py-[6px] gap-2'

const badgeStyles = {
  processing: 'bg-blue-bg text-blue-text',
  done: 'bg-green-bg text-green-text',
  failed: 'bg-red-100 text-error',
}

const Badge: React.FC<BadgeProps> = ({ variant, children }) => {
  return (
    <span className={`${baseStyle} ${badgeStyles[variant]}`}>
      {children}
    </span>
  )
}

export default Badge