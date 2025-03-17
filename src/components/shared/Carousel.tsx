import { useState, useEffect } from 'react'
import { slidesOfCarousel } from '../../util/data'

export default function Carousel() {
	const [currentIndex, setCurrentIndex] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex(prevIndex => (prevIndex + 1) % slidesOfCarousel.length)
		}, 2000)

		return () => clearInterval(interval)
	}, [])

	const goToSlide = (index: number) => {
		setCurrentIndex(index)
	}

	return (
		<div className='relative w-full max-w-xl mx-auto overflow-hidden rounded-2xl'>
			<div
				className='flex transition-transform duration-500 ease-in-out'
				style={{ transform: `translateX(-${currentIndex * 100}%)` }}
			>
				{slidesOfCarousel.map(slide => (
					<div key={slide.id} className='min-w-full'>
						<img
							loading='lazy'
							src={slide.src}
							alt={slide.alt}
							className='w-full h-72 object-cover rounded-2xl'
						/>
						<div className='p-6 text-center h-44'>
							<h3 className='text-[32px] font-medium text-white leading-10 mb-2'>
								{slide.title}
							</h3>
							<p className='text-[16px] font-normal leading-6 text-white'>
								{slide.description}
							</p>
						</div>
					</div>
				))}
			</div>

			<div className='absolute bottom-4 top left-1/2 transform -translate-x-1/2 flex space-x-2'>
				{slidesOfCarousel.map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-125 cursor-pointer ${
							index === currentIndex ? 'bg-white scale-150' : 'bg-white-70'
						}`}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</div>
	)
}
