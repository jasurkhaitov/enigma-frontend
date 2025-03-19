import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
	FileCheck,
	HelpCircle,
	Upload,
	Clock,
	Ban,
	Download,
	UserCheck,
	Menu,
	X,
} from 'lucide-react'

const UsagePolicy = () => {
	const [activeSection, setActiveSection] = useState<string | null>('files')
	const [menuOpen, setMenuOpen] = useState(false)

	const toggleMenu = () => {
		setMenuOpen(!menuOpen)
	}

	const selectSection = (key: string) => {
		setActiveSection(key)
		if (window.innerWidth < 768) {
			setMenuOpen(false)
		}
	}

	const sections = [
		{
			key: 'files',
			title: 'File Requirements',
			icon: FileCheck,
			content: [
				'Supported format: Microsoft Word (.docx) files only',
				'Maximum file size: 10 MB per document',
				'Maximum characters: 50,000 per document',
				'Text must be editable (no scanned documents)',
				'Documents must use Unicode character encoding',
				'Files must not contain malware or executable code',
			],
		},
		{
			key: 'upload',
			title: 'Upload Process',
			icon: Upload,
			content: [
				'Login to your account before uploading',
				'Select "New Translation" from dashboard',
				'Choose source and target languages',
				'Upload your document using the file selector',
				'Verify document preview is correct',
				'Submit for translation processing',
			],
		},
		{
			key: 'processing',
			title: 'Processing Times',
			icon: Clock,
			content: [
				'Standard processing: 1-5 minutes per document',
				'Processing time depends on document length',
				'Peak hours may experience longer wait times',
				'Priority processing available on Professional plans',
				'Email notification sent when translation complete',
				'Documents remain available for 30 days',
			],
		},
		{
			key: 'download',
			title: 'Downloading Results',
			icon: Download,
			content: [
				'Access completed translations from your dashboard',
				'Download translated documents in .docx format',
				'Original formatting preserved when possible',
				'Document history available for 30 days',
				'Maximum of 5 downloads per translation',
				'Share feature available for team accounts',
			],
		},
		{
			key: 'limitations',
			title: 'Service Limitations',
			icon: Ban,
			content: [
				'No support for handwritten text',
				'No translation of embedded images or graphics',
				'Complex tables may lose formatting',
				'Technical terminology may require manual review',
				'Character limits based on subscription tier',
				'Some dialects may have reduced accuracy',
			],
		},
		{
			key: 'accounts',
			title: 'Account Usage',
			icon: UserCheck,
			content: [
				'One user per standard account',
				'Team accounts available for multiple users',
				'Account sharing is prohibited',
				'Excessive usage patterns may trigger review',
				'API access requires Enterprise subscription',
				'Annual inactivity may result in account suspension',
			],
		},
		{
			key: 'help',
			title: 'Getting Help',
			icon: HelpCircle,
			content: [
				'Knowledge base available at help.enigma.uz',
				'Email support: support@enigma.uz',
				'Support hours: Monday-Friday, 9:00-18:00 UZT',
				'Premium support available on Professional plans',
				'Bug reports should include document ID',
				'Feature requests can be submitted via feedback form',
			],
		},
	]

	const menuVariants = {
		closed: {
			height: 0,
			opacity: 0,
			transition: {
				duration: 0.3,
				when: 'afterChildren',
				staggerChildren: 0.05,
				staggerDirection: -1,
			},
		},
		open: {
			height: 'auto',
			opacity: 1,
			transition: {
				duration: 0.3,
				when: 'beforeChildren',
				staggerChildren: 0.05,
				staggerDirection: 1,
			},
		},
	}

	const itemVariants = {
		closed: {
			opacity: 0,
			y: 10,
			transition: { duration: 0.2 },
		},
		open: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.2 },
		},
	}

	return (
		<div className='bg-gradient-to-br flex items-center justify-center p-4 my-10'>
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
				className='bg-white border border-gray-200 shadow-lg rounded-2xl overflow-hidden max-w-4xl w-full md:grid md:grid-cols-3 min-h-[500px]'
			>
				<div className='md:hidden bg-emerald-700 text-white p-4 flex justify-between items-center'>
					<motion.h1
						initial={{ y: -20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.2 }}
						className='text-xl font-bold flex items-center'
					>
						<FileCheck className='mr-2' /> Usage Guidelines
					</motion.h1>
					<motion.button
						onClick={toggleMenu}
						className='p-2 rounded-lg hover:bg-emerald-800 transition-colors'
						aria-label='Toggle navigation menu'
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
					>
						<AnimatePresence mode='wait'>
							{menuOpen ? (
								<motion.div
									key='close'
									initial={{ rotate: -90, opacity: 0 }}
									animate={{ rotate: 0, opacity: 1 }}
									exit={{ rotate: 90, opacity: 0 }}
									transition={{ duration: 0.2 }}
								>
									<X size={24} />
								</motion.div>
							) : (
								<motion.div
									key='open'
									initial={{ rotate: 90, opacity: 0 }}
									animate={{ rotate: 0, opacity: 1 }}
									exit={{ rotate: -90, opacity: 0 }}
									transition={{ duration: 0.2 }}
								>
									<Menu size={24} />
								</motion.div>
							)}
						</AnimatePresence>
					</motion.button>
				</div>

				<AnimatePresence>
					<motion.div
						className='bg-emerald-700 text-white p-6 space-y-2 md:space-y-3 overflow-hidden md:block'
						initial={false}
						animate={menuOpen || window.innerWidth >= 768 ? 'open' : 'closed'}
						variants={menuVariants}
						style={{
							display:
								window.innerWidth >= 768
									? 'block'
									: menuOpen
									? 'block'
									: 'none',
						}}
					>
						<motion.h1
							variants={itemVariants}
							className='text-2xl font-bold mb-6 hidden md:flex items-center'
						>
							<FileCheck className='mr-3' /> Usage Guidelines
						</motion.h1>
						{sections.map(section => {
							const Icon = section.icon
							return (
								<motion.button
									key={section.key}
									variants={itemVariants}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => selectSection(section.key)}
									className={`w-full text-left p-3 rounded-lg flex items-center transition-all cursor-pointer ${
										activeSection === section.key
											? 'bg-emerald-900 text-white'
											: 'hover:bg-emerald-800 text-emerald-100'
									}`}
								>
									<Icon className='mr-3' />
									{section.title}
								</motion.button>
							)
						})}
					</motion.div>
				</AnimatePresence>

				<div className='col-span-2 p-6 md:p-8 overflow-y-auto'>
					<AnimatePresence mode='wait'>
						{sections.map(
							section =>
								activeSection === section.key && (
									<motion.div
										key={section.key}
										initial={{ opacity: 0, x: 50 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -50 }}
										transition={{ duration: 0.3 }}
										className='space-y-4'
									>
										<h2 className='text-xl md:text-2xl font-bold text-emerald-800 mb-4'>
											{section.title}
										</h2>
										{section.content.map((item, index) => (
											<motion.p
												key={index}
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ delay: index * 0.1 }}
												className='text-sm md:text-base text-gray-700 pl-4 relative before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-emerald-500 before:rounded-full'
											>
												{item}
											</motion.p>
										))}
									</motion.div>
								)
						)}
					</AnimatePresence>
				</div>
			</motion.div>
		</div>
	)
}

export default UsagePolicy
