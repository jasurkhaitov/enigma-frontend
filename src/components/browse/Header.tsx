import React from 'react'

interface HeaderProps {
  title: string
  description: string
}

const Header: React.FC<HeaderProps> = ({ title, description }) => {
  return (
    <div className='flex flex-col items-center gap-3 mb-6'>
      <h1 className='font-semibold text-text text-2xl sm:text-3xl md:text-[32px] text-center'>
        {title}
      </h1>
      <p className='font-normal text-sm sm:text-[16px] leading-6 text-center'>
        {description}
      </p>
    </div>
  )
}

export default Header