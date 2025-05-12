import { possibilitiesData } from '@/util/data'

export default function BrowsePossibility() {
	return (
		<div className='w-full text-center'>
			<h2 className='text-2xl sm:text-3xl font-semibold text-text mb-2 sm:mb-3'>
				Possibilities
			</h2>
			<p className='text-sm sm:text-base font-normal text-text mb-6 sm:mb-8 lg:mb-12'>
				Enigma — AI that understands legal language, finds errors in
				translations and saves up to 80% of
				<br className='hidden sm:block' /> the time spent on reconciliation
			</p>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-between gap-4 sm:gap-5'>
				{possibilitiesData.map(item => {
					return (
						<div
							key={item.id}
							className='p-4 sm:p-5 text-start border border-disabled-bg rounded-[8px]'
						>
							<img src={item.img} alt={item.title} className='w-full h-auto' />
							<h3 className='text-sm sm:text-base font-semibold mb-1 sm:mb-2 mt-3 sm:mt-4'>
								{item.title}
							</h3>
							<p className='text-xs sm:text-sm lg:text-base font-normal'>
								{item.desc}
							</p>
						</div>
					)
				})}
			</div>
		</div>
	)
}
