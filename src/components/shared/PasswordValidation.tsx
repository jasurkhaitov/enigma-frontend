export default function PasswordValidation() {
	return (
		<>
			<h3 className='font-semibold text-gray-text leading-6 text-[14px] space-y-2'>
				Password Security Best Practices:
			</h3>
			<ul className='list-disc list-inside font-normal text-gray-text leading-6 text-[14px] space-y-2'>
				<li>
					Must include at least 1 uppercase and lowercase letter, number, and
					symbol (e.g., !, @, #, $)
				</li>
				<li>Avoid easy-to-guess words like birthdays or pet names</li>
				<li>Update your password regularly for extra security</li>
			</ul>
		</>
	)
}