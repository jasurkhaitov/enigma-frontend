import React from 'react'
import { SeparateFilesIcon, SingleFileIcon } from './FileIcons'

interface TabSelectorProps {
  activeTab: 'separate' | 'single'
  onTabChange: (tab: 'separate' | 'single') => void
  isAnimating: boolean
}

const TabSelector: React.FC<TabSelectorProps> = ({ 
  activeTab, 
  onTabChange,
  isAnimating
}) => {
  const handleTabChange = (tab: 'separate' | 'single') => {
    if (tab !== activeTab && !isAnimating) {
      onTabChange(tab)
    }
  }

  return (
    <div className='relative flex w-full max-w-[400px] mb-6 h-12 m-auto border border-gray-200 rounded-full overflow-hidden bg-white shadow-sm'>
      <div
        className='absolute top-0 bottom-0 bg-primary hover:bg-primary-hover transition-all duration-300 ease-in-out rounded-full'
        style={{
          width: '50%',
          left: activeTab === 'separate' ? '0%' : '50%',
        }}
      />
      <button
        className={`relative z-1 flex-1 text-sm sm:text-[16px] leading-6 h-full flex cursor-pointer items-center justify-center font-medium transition-all duration-300 ${
          activeTab === 'separate'
            ? 'text-white'
            : 'text-gray-700 hover:text-gray-900'
        }`}
        onClick={() => handleTabChange('separate')}
      >
        <SeparateFilesIcon isActive={activeTab === 'separate'} />
        <span className='ml-2'>Separate Files</span>
      </button>
      <button
        className={`relative z-1 flex-1 text-sm sm:text-[16px] leading-6 h-full flex cursor-pointer items-center justify-center font-medium transition-all duration-300 ${
          activeTab === 'single'
            ? 'text-white'
            : 'text-gray-700 hover:text-gray-900'
        }`}
        onClick={() => handleTabChange('single')}
      >
        <SingleFileIcon isActive={activeTab === 'single'} />
        <span className='ml-2'>Single File</span>
      </button>
    </div>
  )
}

export default TabSelector