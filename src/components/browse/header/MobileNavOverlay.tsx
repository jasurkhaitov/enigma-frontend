interface MobileNavOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileNavOverlay({ isOpen, onClose }: MobileNavOverlayProps) {
  if (!isOpen) return null
  return (
    <div
      className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300'
      onClick={onClose}
    />
  )
}
