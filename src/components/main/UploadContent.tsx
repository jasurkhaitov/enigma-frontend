import React, { useRef } from 'react'
import MultipleFile from '../files/MultipleFile'
import SingleFile from '../files/SingleFile'

interface UploadContentProps {
	activeTab: 'separate' | 'single'
	isAnimating: boolean
	onLoadingChange: (loading: boolean) => void
	onLoadingError: (err: boolean) => void
	onTaskCreated: (id: string) => void
}

const UploadContent: React.FC<UploadContentProps> = ({
	activeTab,
	isAnimating,
	onLoadingChange,
	onLoadingError,
	onTaskCreated,
}) => {
	const contentRef = useRef<HTMLDivElement | null>(null)

	return (
		<div className='perspective overflow-hidden'>
			<div
				ref={contentRef}
				className={`transition-opacity transform duration-200 ease-in-out ${
					isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
				}`}
			>
				<div className='flex flex-col md:flex-row gap-4'>
					{activeTab === 'separate' ? (
						<MultipleFile
							onLoadingChange={onLoadingChange}
							onLoadingError={onLoadingError}
							onTaskCreated={onTaskCreated}
						/>
					) : (
						<SingleFile
							onLoadingError={onLoadingError}
							onLoadingChange={onLoadingChange}
							onTaskCreated={onTaskCreated}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

export default UploadContent
