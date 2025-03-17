import { Loader } from 'lucide-react'

export default function ProcessLoader({ activeTab }: { activeTab: string }) {
	return (
		<div className='w-full max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[400px]'>
			<Loader className='animate-spin w-12 h-12 text-primary mb-6' />

			<h2 className='text-xl font-medium mb-2 leading-6'>
				{activeTab === 'separate'
					? 'Comparing Your Documents...'
					: 'Translating Your Document...'}
			</h2>

			<p className='mt-3 text-gray-500 text-center'>
				{activeTab === 'separate'
					? 'We’re analyzing both documents to check for accurate translations.'
					: 'We’re processing your document and ensuring a precise translation.'} <br/>
				This might take a few moments - hang tight!
			</p>
		</div>
	)
}
