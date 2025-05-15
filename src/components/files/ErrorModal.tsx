import { CloudAlert } from 'lucide-react'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'

interface ErrorModalProps {
	isOpen: boolean
	onClose: () => void
	onRetry?: () => void
}

export default function ErrorModal({
	isOpen,
	onClose,
	onRetry,
}: ErrorModalProps) {
	const [isAnimating, setIsAnimating] = useState(false)
	const [animateIcon, setAnimateIcon] = useState(false)

	useEffect(() => {
		if (isOpen) {
			setIsAnimating(true)
			setTimeout(() => setAnimateIcon(true), 150)
		} else {
			setAnimateIcon(false)
			setTimeout(() => setIsAnimating(false), 300)
		}
	}, [isOpen])

	if (!isOpen && !isAnimating) return null

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			setAnimateIcon(false)
			setTimeout(() => onClose(), 100)
		}
	}

	const handleRetry = () => {
		if (onRetry) {
			onRetry()
		}
		onClose()
	}

	return (
		<div
			className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ${
				isOpen
					? 'bg-black/60 backdrop-blur-sm'
					: 'bg-black/0 backdrop-blur-none pointer-events-none'
			}`}
			onClick={handleBackdropClick}
		>
			<div
				className={`bg-white max-w-sm rounded-lg p-6 text-center shadow-xl transition-all duration-300 ${
					isOpen
						? 'scale-100 opacity-100 translate-y-0'
						: 'scale-95 opacity-0 translate-y-4'
				}`}
			>
				<div
					className={`flex justify-center mb-4 transition-all duration-500 ${
						animateIcon ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
					}`}
				>
					<div className={`${animateIcon ? 'animate-bounce-once' : ''}`}>
						<CloudAlert className='w-12 h-12 text-red-600' />
					</div>
				</div>

				<h2
					className={`text-lg font-semibold text-text mb-3 transition-all duration-300 delay-100 ${
						isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
					}`}
				>
					File Upload Error
				</h2>

				<p
					className={`text-gray-text text-base mb-4 transition-all duration-300 delay-150 ${
						isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
					}`}
				>
					Something went wrong while uploading your file. Please check the
					format and try again.
				</p>

				<div
					className={`flex flex-col gap-2 justify-center transition-all duration-300 delay-200 ${
						isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
					}`}
				>
					<Button
						onClick={handleRetry}
						className='inline hover:scale-105 active:scale-95 transition-transform'
					>
						Try again
					</Button>
				</div>
			</div>
		</div>
	)
}