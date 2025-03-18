import { useState, useEffect, useCallback } from 'react'
import ProcessLoader from '../files/ProcessLoader'
import ErrorModal from '../files/ErrorModal'
import { useGetTaskInformationQuery } from '@/service/jobsApi'
import TaskInformation from '../files/TaskInformation'
import Header from './Header'
import TabSelector from './TabSelector'
import UploadContent from './UploadContent'

const UploadManagementTab = () => {
	const [activeTab, setActiveTab] = useState<'separate' | 'single'>('separate')
	const [isAnimating, setIsAnimating] = useState(false)
	const [isUploading, setIsUploading] = useState(false)
	const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
	const [taskId, setTaskId] = useState<string | null>(null)
	const [transitionState, setTransitionState] = useState<
		'idle' | 'exit' | 'enter'
	>('idle')
	const [currentView, setCurrentView] = useState<
		'main' | 'loader' | 'taskInfo'
	>('main')

	const {
		data: taskData,
		isFetching,
		refetch,
	} = useGetTaskInformationQuery(taskId!, {
		skip: !taskId,
		refetchOnMountOrArgChange: true,
	})

	useEffect(() => {
		if (!taskId) return

		setIsUploading(true)

		const pollTaskStatus = async () => {
			try {
				const response = await refetch()
				const latestData = response.data

				if (latestData && latestData.success === true) {
					setIsUploading(false)
					clearInterval(interval)
				} else if (latestData && latestData.success === false) {
					setIsUploading(false)
					setIsErrorModalOpen(true)
					clearInterval(interval)
				}
				console.log(latestData)
			} catch (error) {
				console.error('Error polling task status:', error)
				setIsUploading(false)
				setIsErrorModalOpen(true)
				clearInterval(interval)
			}
		}

		const interval = setInterval(pollTaskStatus, 1000)

		return () => clearInterval(interval)
	}, [taskId, refetch])

	const handleViewTransition = useCallback(
		(nextView: 'main' | 'loader' | 'taskInfo') => {
			if (currentView === nextView) return
			setTransitionState('exit')
			setTimeout(() => {
				setCurrentView(nextView)
				setTransitionState('enter')
				setTimeout(() => {
					setTransitionState('idle')

					if (nextView === 'taskInfo') {
						setTimeout(() => {
							setTransitionState('exit')
							setTimeout(() => {
								setCurrentView('main')
								setTransitionState('enter')
								setTaskId(null)
								setTimeout(() => setTransitionState('idle'), 300)
							}, 200)
						}, 10000)
					}
				}, 300)
			}, 200)
		},
		[currentView]
	)

	useEffect(() => {
		if (isErrorModalOpen) {
			handleViewTransition('main')
			return
		}

		if (isUploading) {
			handleViewTransition('loader')
		} else if (!isUploading && taskId && taskData) {
			handleViewTransition('taskInfo')
		} else if (!isUploading && !taskId) {
			handleViewTransition('main')
		}
	}, [isUploading, taskId, taskData, isErrorModalOpen, handleViewTransition])

	const handleTabChange = (tab: 'separate' | 'single') => {
		setIsAnimating(true)
		setTimeout(() => {
			setActiveTab(tab)
			setTimeout(() => setIsAnimating(false), 300)
		}, 150)
	}

	const handleLoadingChange = (loading: boolean) => {
		setIsUploading(loading)
	}

	const handleError = (err: boolean) => {
		setIsUploading(false)
		setIsErrorModalOpen(err)
	}

	const handleTaskCreated = (id: string) => {
		setTaskId(id)
	}

	const getTransitionClasses = () => {
		switch (transitionState) {
			case 'exit':
				return 'opacity-0 transform scale-95 transition-all duration-300'
			case 'enter':
				return 'opacity-0 transform scale-105 transition-all duration-300'
			default:
				return 'opacity-100 transform scale-100 transition-all duration-300'
		}
	}

	return (
		<>
			<div className='w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8'>
				{currentView === 'main' && (
					<div className={getTransitionClasses()}>
						<Header
							title='Compare Text and Word Documents'
							description='Use our side-by-side document comparison software below to highlight changes'
						/>
						<TabSelector
							activeTab={activeTab}
							onTabChange={handleTabChange}
							isAnimating={isAnimating}
						/>
						<UploadContent
							activeTab={activeTab}
							isAnimating={isAnimating}
							onLoadingChange={handleLoadingChange}
							onLoadingError={handleError}
							onTaskCreated={handleTaskCreated}
						/>
					</div>
				)}
				{currentView === 'loader' && (
					<div className={getTransitionClasses()}>
						<ProcessLoader activeTab={activeTab} />
					</div>
				)}
				{currentView === 'taskInfo' && taskData && (
					<div className={getTransitionClasses()}>
						<TaskInformation
							loading={isFetching}
							id={taskData.args[0].id}
							time={taskData.enqueue_time}
							name={taskData.args[0].name}
						/>
					</div>
				)}
			</div>
			<ErrorModal
				isOpen={isErrorModalOpen}
				onClose={() => setIsErrorModalOpen(false)}
			/>
		</>
	)
}

export default UploadManagementTab
