import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
	FileText,
	BookOpen,
	AlertCircle,
	Scale,
	Shield,
	FileTerminal,
	CreditCard,
	Menu,
	X
} from 'lucide-react'

const ConsumerTerms = () => {
	const [activeSection, setActiveSection] = useState<string | null>('service')
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
			key: 'service',
			title: 'Service Description',
			icon: FileText,
			content: [
				'Enigma provides automated English ↔ Uzbek document translation',
				'Users can upload Word (.docx) files for translation',
				'Maximum file size: 25MB per document',
				'Processing time varies based on document length',
				'User accounts required for all translation services',
			],
		},
		{
			key: 'subscription',
			title: 'Subscription Plans',
			icon: CreditCard,
			content: [
				'Free Tier: 3 documents per month (up to 1,000 words each)',
				'Standard Plan: 20 documents per month (up to 5,000 words each)',
				'Professional Plan: 100 documents per month (unlimited word count)',
				'Enterprise: Custom volume options available',
				'All paid plans billed monthly with auto-renewal',
			],
		},
		{
			key: 'usage',
			title: 'Acceptable Use',
			icon: BookOpen,
			content: [
				'Content must not violate Uzbekistan laws',
				'No uploading of sensitive personal information',
				'No uploading of confidential government documents',
				'No automated/bot access without written permission',
				'Usage limited to authorized account holder',
			],
		},
		{
			key: 'restrictions',
			title: 'Restrictions',
			icon: AlertCircle,
			content: [
				'Users may not reverse-engineer our translation system',
				'No redistribution of translation output for commercial purposes',
				'No scraping, crawling, or indexing of our website',
				'No using service to create competing translation product',
				'Multiple accounts per individual prohibited',
			],
		},
		{
			key: 'liability',
			title: 'Liability',
			icon: Scale,
			content: [
				'Translations provided "as is" without warranty',
				'We are not liable for translation inaccuracies',
				'Users responsible for reviewing sensitive translations',
				'Maximum liability limited to subscription fees paid',
				'No responsibility for consequential damages',
			],
		},
		{
			key: 'termination',
			title: 'Account Termination',
			icon: Shield,
			content: [
				'We reserve right to terminate accounts for terms violation',
				'Users may cancel subscription at any time',
				'No refunds for partial billing periods',
				'Inactive accounts may be suspended after 12 months',
				'Repeated violations result in permanent ban',
			],
		},
		{
			key: 'changes',
			title: 'Policy Changes',
			icon: FileTerminal,
			content: [
				'Terms may be updated with 30 days notice',
				'Continued use constitutes acceptance of new terms',
				'Major changes notified via email',
				'Previous versions available upon request',
				'Uzbekistan law governs all disputes',
			],
		},
	]

	const menuVariants = {
		closed: {
			height: 0,
			opacity: 0,
			transition: {
				duration: 0.3,
				when: "afterChildren",
				staggerChildren: 0.05,
				staggerDirection: -1
			}
		},
		open: {
			height: "auto",
			opacity: 1,
			transition: {
				duration: 0.3,
				when: "beforeChildren",
				staggerChildren: 0.05,
				staggerDirection: 1
			}
		}
	}

	const itemVariants = {
		closed: {
			opacity: 0,
			y: 10,
			transition: { duration: 0.2 }
		},
		open: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.2 }
		}
	}

	return (
		<div className='bg-gradient-to-br flex items-center justify-center p-4 my-10'>
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
				className='bg-white border border-gray-200 shadow-lg rounded-2xl overflow-hidden max-w-4xl w-full md:grid md:grid-cols-3 min-h-[500px]'
			>
				<div className='md:hidden bg-yellow-700 text-white p-4 flex justify-between items-center'>
					<motion.h1
						initial={{ y: -20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.2 }}
						className='text-xl font-bold flex items-center'
					>
						<FileText className='mr-2' /> Enigma Terms
					</motion.h1>
					<motion.button 
						onClick={toggleMenu}
						className='p-2 rounded-lg hover:bg-yellow-800 transition-colors'
						aria-label='Toggle navigation menu'
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
					>
						<AnimatePresence mode="wait">
							{menuOpen ? (
								<motion.div
									key="close"
									initial={{ rotate: -90, opacity: 0 }}
									animate={{ rotate: 0, opacity: 1 }}
									exit={{ rotate: 90, opacity: 0 }}
									transition={{ duration: 0.2 }}
								>
									<X size={24} />
								</motion.div>
							) : (
								<motion.div
									key="open"
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
						className="bg-yellow-700 text-white p-6 space-y-2 md:space-y-3 overflow-hidden md:block"
						initial={false}
						animate={menuOpen || window.innerWidth >= 768 ? "open" : "closed"}
						variants={menuVariants}
						style={{ display: window.innerWidth >= 768 ? "block" : menuOpen ? "block" : "none" }}
					>
						<motion.h1
							variants={itemVariants}
							className='text-2xl font-bold mb-6 hidden md:flex items-center'
						>
							<FileText className='mr-3' /> Enigma Terms
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
											? 'bg-yellow-900 text-white'
											: 'hover:bg-yellow-800 text-yellow-100'
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
										<h2 className='text-xl md:text-2xl font-bold text-yellow-800 mb-4'>
											{section.title}
										</h2>
										{section.content.map((item, index) => (
											<motion.p
												key={index}
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ delay: index * 0.1 }}
												className='text-sm md:text-base text-gray-700 pl-4 relative before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-yellow-500 before:rounded-full'
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

export default ConsumerTerms