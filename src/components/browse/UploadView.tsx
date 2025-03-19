import React from 'react'
import Header from './Header'
import TabSelector from './TabSelector'
import UploadContent from './UploadContent'

interface UploadViewProps {
	activeTab: 'separate' | 'single'
	isAnimating: boolean
	onTabChange: (tab: 'separate' | 'single') => void
	onLoadingChange: (loading: boolean) => void
	onLoadingError: (err: boolean) => void
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
			<Header
				title='Compare Text and Word Documents'
				description='Use our side-by-side document comparison software below to highlight changes'
			/>
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
