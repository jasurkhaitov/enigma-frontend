export const SeparateFilesIcon = ({ isActive }: { isActive: boolean }) => (
	<svg
		className={`w-4 h-4 mr-2 ${isActive ? 'text-white' : 'text-gray-500'}`}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M9 17H5C3.89543 17 3 16.1046 3 15V5C3 3.89543 3.89543 3 5 3H15C16.1046 3 17 3.89543 17 5V9'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
		/>
		<path
			d='M14 15V21C14 21.5523 14.4477 22 15 22H19C19.5523 22 20 21.5523 20 21V15C20 14.4477 19.5523 14 19 14H15C14.4477 14 14 14.4477 14 15Z'
			stroke='currentColor'
			strokeWidth='2'
		/>
		<path
			d='M14 9V3C14 2.44772 14.4477 2 15 2H19C19.5523 2 20 2.44772 20 3V9C20 9.55228 19.5523 10 19 10H15C14.4477 10 14 9.55228 14 9Z'
			stroke='currentColor'
			strokeWidth='2'
		/>
	</svg>
)

export const SingleFileIcon = ({ isActive }: { isActive: boolean }) => (
	<svg
		className={`w-4 h-4 mr-2 ${isActive ? 'text-white' : 'text-gray-500'}`}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M14 2V8H20'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M16 13H8'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M16 17H8'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M10 9H9H8'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
)