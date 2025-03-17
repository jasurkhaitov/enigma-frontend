export default function AuthHeader({
	title,
	desc,
}: {
	title: string
	desc: string
}) {
	return (
		<div className='flex flex-col items-start gap-3'>
			<h2 className='font-semibold text-xl leading-8 tracking-normal text-text'>
				{title}
			</h2>
			<p className='font-normal text-sm leading-6 text-gray-text'>{desc}</p>
		</div>
	)
}
