import { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type TooltipProps = {
  text: string
  children: ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  variant?: 'default' | 'error'
  className?: string
  isVisible?: boolean
}

const tooltipStyles = {
  base: 'absolute z-10 w-[70%] min-w-[150px] text-sm shadow-lg backdrop-blur-sm font-body font-normal text-[14px] leading-[16px] rounded-[8px] p-[12px_16px] text-white',
  variants: {
    default: 'bg-checkbox-bg',
    error: 'bg-error',
  },
  arrow: {
    default: 'bg-checkbox-bg',
    error: 'bg-error',
  },
}

export function Tooltip({
  text,
  children,
  position = 'top',
  variant = 'default',
  className = '',
  isVisible = false,
}: TooltipProps) {
  return (
    <div className={`relative inline-flex items-center ${className}`}>
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: position === 'top' ? -8 : 8,
            }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: position === 'top' ? -8 : 8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`${tooltipStyles.base} ${tooltipStyles.variants[variant]}
              ${
                position === 'top'
                  ? 'bottom-full mb-2 left-1/2 -translate-x-1/2'
                  : ''
              }
              ${
                position === 'bottom'
                  ? 'top-full mt-2 left-1/2 -translate-x-1/2'
                  : ''
              }
              ${
                position === 'left'
                  ? 'right-full mr-2 top-1/2 -translate-y-1/2'
                  : ''
              }
              ${
                position === 'right'
                  ? 'left-full ml-2 top-1/2 -translate-y-1/2'
                  : ''
              }
            `}
          >
            {text}
            <div
              className={`absolute w-3 h-3 rotate-45 ${
                tooltipStyles.arrow[variant]
              }
                ${
                  position === 'top'
                    ? 'left-1/2 -translate-x-1/2 bottom-[-5px]'
                    : ''
                }
                ${
                  position === 'bottom'
                    ? 'left-1/2 -translate-x-1/2 top-[-5px]'
                    : ''
                }
                ${
                  position === 'left'
                    ? 'top-1/2 -translate-y-1/2 right-[-5px]'
                    : ''
                }
                ${
                  position === 'right'
                    ? 'top-1/2 -translate-y-1/2 left-[-5px]'
                    : ''
                }
              `}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}