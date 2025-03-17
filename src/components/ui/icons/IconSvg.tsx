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

	PdfIcon: ({ size = 40, className = '' }) => (
		<svg
			width={size}
			height={size}
			viewBox='0 0 48 48'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={className}
		>
			<g filter='url(#filter0_ii_7274_435)'>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M11 4C9.23274 4 7.80005 5.43269 7.80005 7.2V40.8C7.80005 42.5673 9.23274 44 11 44H37C38.7674 44 40.2001 42.5673 40.2001 40.8V13.9998L30.2002 4H11Z'
					fill='#FA4E4E'
				/>
			</g>
			<path
				d='M30.4963 30.9387C29.1465 30.8384 27.847 30.3372 26.7973 29.4349C24.7478 29.8859 22.798 30.5374 20.8485 31.3397C19.299 34.0964 17.8493 35.4999 16.5995 35.4999C16.3495 35.4999 16.0498 35.4499 15.8498 35.2994C15.2998 35.0489 15 34.4974 15 33.9462C15 33.4949 15.1 32.2419 19.8488 30.1867C20.9488 28.1817 21.7983 26.1267 22.4983 23.9714C21.8983 22.7684 20.5988 19.8109 21.4983 18.3074C21.7983 17.7559 22.3983 17.4552 23.0483 17.5054C23.548 17.5054 24.0478 17.7559 24.3478 18.1569C24.9978 19.0592 24.9478 20.9639 24.0977 23.7709C24.8978 25.2725 25.9456 26.6282 27.197 27.7809C28.247 27.5802 29.2965 27.4299 30.3463 27.4299C32.6958 27.4799 33.0458 28.5827 32.9958 29.2344C32.9958 30.9387 31.346 30.9387 30.4963 30.9387ZM16.4997 34.0462L16.6497 33.9962C17.3495 33.7457 17.8992 33.2444 18.2992 32.5927C17.5492 32.8934 16.9495 33.3947 16.4997 34.0464V34.0462ZM23.148 19.0092H22.998C22.948 19.0092 22.848 19.0092 22.798 19.0592C22.598 19.9112 22.748 20.8134 23.098 21.6154C23.398 20.7634 23.398 19.8612 23.148 19.0092ZM23.498 26.2772L23.448 26.3772L23.398 26.3272C22.948 27.4802 22.448 28.6329 21.8983 29.7357L21.9983 29.6857V29.7857C23.1099 29.3826 24.2451 29.0479 25.3975 28.7832L25.3475 28.7332H25.4975C24.7475 27.9812 24.0478 27.1292 23.498 26.2772ZM30.2963 28.9337C29.8463 28.9337 29.4465 28.9337 28.9965 29.0337C29.4965 29.2844 29.9965 29.3847 30.4963 29.4349C30.8463 29.4849 31.1963 29.4349 31.496 29.3347C31.496 29.1842 31.296 28.9337 30.2963 28.9337Z'
				fill='white'
			/>
			<path
				d='M39.2617 13.0625H31.1375L40.2 22.125V14L39.2617 13.0625Z'
				fill='url(#paint0_linear_7274_435)'
			/>
			<path
				d='M33.4 14L40.2 14L30.2 4L30.2 10.8C30.2 12.5673 31.6326 14 33.4 14Z'
				fill='#FDB8B8'
			/>
			<defs>
				<filter
					id='filter0_ii_7274_435'
					x='7.80005'
					y='3.8'
					width='32.3999'
					height='40.4'
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'
				>
					<feFlood floodOpacity='0' result='BackgroundImageFix' />
					<feBlend
						mode='normal'
						in='SourceGraphic'
						in2='BackgroundImageFix'
						result='shape'
					/>
					<feColorMatrix
						in='SourceAlpha'
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
						result='hardAlpha'
					/>
					<feOffset dy='-0.4' />
					<feGaussianBlur stdDeviation='0.1' />
					<feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
					<feColorMatrix
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0'
					/>
					<feBlend
						mode='normal'
						in2='shape'
						result='effect1_innerShadow_7274_435'
					/>
					<feColorMatrix
						in='SourceAlpha'
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
						result='hardAlpha'
					/>
					<feOffset dy='0.4' />
					<feGaussianBlur stdDeviation='0.1' />
					<feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
					<feColorMatrix
						type='matrix'
						values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0'
					/>
					<feBlend
						mode='normal'
						in2='effect1_innerShadow_7274_435'
						result='effect2_innerShadow_7274_435'
					/>
				</filter>
				<linearGradient
					id='paint0_linear_7274_435'
					x1='33.1687'
					y1='11.0313'
					x2='42.2312'
					y2='20.0938'
					gradientUnits='userSpaceOnUse'
				>
					<stop stopOpacity='0.2' />
					<stop offset='1' stopOpacity='0' />
				</linearGradient>
			</defs>
		</svg>
	),

	ErrorMessageIcon: ({ size = 40, className = '' }) => (
		<svg
			width={size}
			height={size}
			viewBox='0 0 40 40'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={className}
		>
			<path
				d='M20 13.3333V20M20 26.6667H20.0167M13 35H27C29.8003 35 31.2004 35 32.27 34.455C33.2108 33.9757 33.9757 33.2108 34.455 32.27C35 31.2004 35 29.8003 35 27V13C35 10.1997 35 8.79961 34.455 7.73005C33.9757 6.78924 33.2108 6.02433 32.27 5.54497C31.2004 5 29.8003 5 27 5H13C10.1997 5 8.79961 5 7.73005 5.54497C6.78924 6.02433 6.02433 6.78924 5.54497 7.73005C5 8.79961 5 10.1997 5 13V27C5 29.8003 5 31.2004 5.54497 32.27C6.02433 33.2108 6.78924 33.9757 7.73005 34.455C8.79961 35 10.1997 35 13 35Z'
				stroke='#CC2626'
				strokeWidth='3'
				stroke-linecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	),
}
