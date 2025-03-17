import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShieldCheck,
  Database,
  Lock,
  UserCog,
  BookOpen,
  Mail,
  Menu,
  X
} from 'lucide-react'

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState<string | null>('collect')
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
      key: 'collect',
      title: 'What We Collect',
      icon: Database,
      content: [
        'User Account: Name, email, language preference',
        'Document Information:',
        '• Word (.docx) files',
        '• English ↔ Uzbek translations',
        '• Upload timestamps',
        'Technical Data:',
        '• IP address',
        '• Device type',
        '• Usage patterns',
      ],
    },
    {
      key: 'use',
      title: 'How We Use Your Data',
      icon: BookOpen,
      content: [
        'Provide translation services',
        'Improve translation accuracy',
        'Enhance user experience',
        'Develop language models',
      ],
    },
    {
      key: 'protection',
      title: 'Data Protection',
      icon: Lock,
      content: [
        'AES-256 bit encryption',
        'Documents deleted after processing',
        'No human document review',
        'Strict confidentiality',
      ],
    },
    {
      key: 'rights',
      title: 'User Rights',
      icon: UserCog,
      content: [
        'Delete account and data',
        'Modify personal information',
        'Opt-out of data collection',
        'Request data export',
      ],
    },
    {
      key: 'contact',
      title: 'Contact Us',
      icon: Mail,
      content: [
        'Email: support@enigma.uz',
        'Location: Tashkent, Uzbekistan'
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
        <div className='md:hidden bg-blue-700 text-white p-4 flex justify-between items-center'>
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className='text-xl font-bold flex items-center'
          >
            <ShieldCheck className='mr-2' /> Enigma Policy
          </motion.h1>
          <motion.button 
            onClick={toggleMenu}
            className='p-2 rounded-lg hover:bg-blue-800 transition-colors'
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
            className="bg-blue-700 text-white p-6 space-y-2 md:space-y-3 overflow-hidden md:block"
            initial={false}
            animate={menuOpen || window.innerWidth >= 768 ? "open" : "closed"}
            variants={menuVariants}
            style={{ display: window.innerWidth >= 768 ? "block" : menuOpen ? "block" : "none" }}
          >
            <motion.h1
              variants={itemVariants}
              className='text-2xl font-bold mb-6 hidden md:flex items-center'
            >
              <ShieldCheck className='mr-3' /> Enigma Policy
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
                      ? 'bg-blue-900 text-white'
                      : 'hover:bg-blue-800 text-blue-100'
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
                    <h2 className='text-xl md:text-2xl font-bold text-blue-800 mb-4'>
                      {section.title}
                    </h2>
                    {section.content.map((item, index) => (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className='text-sm md:text-base text-gray-700 pl-4 relative before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-blue-500 before:rounded-full'
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

export default PrivacyPolicy