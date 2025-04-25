export const Icons = {
	Pulse: () => (
		<svg
			width='13'
			height='13'
			viewBox='0 0 16 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M8 1V15M1 8H15'
				stroke='white'
				strokeWidth='3'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	),

	Docs: ({ size = 40, className = '' }) => (
		<svg
			width={size}
			height={size}
			className={className}
			viewBox='0 0 36 44'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M22 2.53906V10.8001C22 11.9202 22 12.4803 22.218 12.9081C22.4097 13.2844 22.7157 13.5904 23.092 13.7822C23.5198 14.0001 24.0799 14.0001 25.2 14.0001H33.4611M22 32H10M26 24H10M34 17.9764V32.4C34 35.7603 34 37.4405 33.346 38.7239C32.7708 39.8529 31.8529 40.7708 30.7239 41.346C29.4405 42 27.7603 42 24.4 42H11.6C8.23969 42 6.55953 42 5.27606 41.346C4.14708 40.7708 3.2292 39.8529 2.65396 38.7239C2 37.4405 2 35.7603 2 32.4L2 11.6C2 8.23969 2 6.55953 2.65396 5.27606C3.2292 4.14708 4.14708 3.2292 5.27606 2.65396C6.55953 2 8.23969 2 11.6 2L18.0236 2C19.4911 2 20.2249 2 20.9154 2.16578C21.5276 2.31276 22.1129 2.55519 22.6497 2.88416C23.2552 3.25521 23.7741 3.77406 24.8118 4.81177L31.1882 11.1882C32.2259 12.2259 32.7448 12.7448 33.1158 13.3503C33.4448 13.8871 33.6872 14.4724 33.8342 15.0846C34 15.7751 34 16.5089 34 17.9764Z'
				stroke='#697486'
				strokeWidth='3'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	),

	CheckCircle: ({ size = 40 }) => (
		<svg
			width={size}
			height={size}
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<circle cx='12' cy='12' r='10' stroke='green' strokeWidth='3' />
			<path
				d='M7 12l3 3 6-6'
				stroke='green'
				strokeWidth='3'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	),

	FileCheck: ({ size = 40, className = '' }) => (
		<svg
			width={size}
			height={size}
			viewBox='0 0 24 24'
			fill='none'
			className={className}
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'
				stroke='green'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M14 2v6h6M9 14l2 2 4-4'
				stroke='green'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	),

	RightArrow: () => (
		<svg
			width='25'
			height='12'
			viewBox='0 0 25 12'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M1 6.5H23.0317L17.9317 10.6C17.7317 10.8 17.7317 11.1 17.9317 11.3C18.0317 11.5 18.4317 11.6 18.6317 11.4L24.3317 6.8C24.5317 6.6 24.6317 6.4 24.7317 6.2C24.7317 5.9 24.7317 5.7 24.5317 5.5C24.4317 5.4 24.4317 5.3 24.3317 5.3L18.5317 0.6C18.5317 0.5 18.4317 0.5 18.3317 0.5C18.2317 0.5 18.0317 0.6 17.9317 0.7C17.7317 0.9 17.7317 1.2 17.9317 1.4L23.0317 5.5H1C0.7 5.5 0.5 5.7 0.5 6C0.5 6.3 0.7 6.5 1 6.5Z'
				fill='black'
			/>
		</svg>
	),

	WordIcon: ({ size = 50, className = '' }) => (
		<svg
			width={size}
			height={size}
			viewBox='0 0 48 48'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={className}
		>
			{/* Define your Word Icon SVG here */}
		</svg>
	),

	ErrorMessageIcon: () => (
		<svg
			width='40'
			height='40'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<circle cx='12' cy='12' r='10' stroke='red' strokeWidth='3' />
			<path
				d='M12 6V12M12 12V18'
				stroke='red'
				strokeWidth='3'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	),
}
