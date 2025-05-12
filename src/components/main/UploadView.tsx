import React from 'react'
import TabSelector from './TabSelector'
import UploadContent from './UploadContent'

interface UploadViewProps {
  activeTab: 'separate' | 'single'
  isAnimating: boolean
  onTabChange: (tab: 'separate' | 'single') => void
  onLoadingChange: (loading: boolean) => void
  onLoadingError: (err: boolean, dropzoneId?: 1 | 2) => void
  onTaskCreated: (id: string) => void
}

const UploadView: React.FC<UploadViewProps> = ({
  activeTab,
  isAnimating,
  onTabChange,
  onLoadingChange,
  onLoadingError,
  onTaskCreated,
}) => {
  return (
    <>
      <TabSelector
        activeTab={activeTab}
        onTabChange={onTabChange}
        isAnimating={isAnimating}
      />
      <UploadContent
        activeTab={activeTab}
        isAnimating={isAnimating}
        onLoadingChange={onLoadingChange}
        onLoadingError={onLoadingError}
        onTaskCreated={onTaskCreated}
      />
    </>
  )
}

export default UploadView