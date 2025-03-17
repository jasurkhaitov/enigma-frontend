import { useTheme } from 'next-themes'
import { Toaster as Sonner, ToasterProps, toast } from 'sonner'
import { CheckCircle, AlertCircle, Info } from 'lucide-react'

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = 'dark' } = useTheme()

	return (
		<Sonner
			theme={theme as ToasterProps['theme']}
			className='toaster group'
			position='bottom-right'
			expand={false}
			richColors
			closeButton
			toastOptions={{
				duration: 4000,
				classNames: {
					toast:
						'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:rounded-lg group-[.toaster]:p-5 group-[.toaster]:min-w-[500px] group-[.toaster]:max-w-[200px]',
					title:
						'group-[.toast]:font-semibold group-[.toast]:text-base group-[.toast]:whitespace-normal',
					description:
						'group-[.toast]:text-muted-foreground group-[.toast]:text-sm group-[.toast]:mt-1 group-[.toast]:whitespace-normal',
					actionButton:
						'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:font-medium group-[.toast]:rounded-md group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:text-sm',
					cancelButton:
						'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:font-medium group-[.toast]:rounded-md group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:text-sm',
					error:
						'group-[.toast]:border-destructive/30 group-[.toast]:bg-destructive/10',
					success:
						'group-[.toast]:border-green-500/30 group-[.toast]:bg-green-500/10',
					info: 'group-[.toast]:border-blue-500/30 group-[.toast]:bg-blue-500/10',
					warning:
						'group-[.toast]:border-yellow-500/30 group-[.toast]:bg-yellow-500/10',
				},
			}}
			{...props}
		/>
	)
}

const enhancedToast = {
	error: (message: string, description?: string) =>
		toast.error(message, {
			description,
			icon: <AlertCircle className='h-5 w-5 text-destructive' />,
		}),
	success: (message: string, description?: string) =>
		toast.success(message, {
			description,
			icon: <CheckCircle className='h-5 w-5 text-green-500' />,
		}),
	info: (message: string, description?: string) =>
		toast.info(message, {
			description,
			icon: <Info className='h-5 w-5 text-blue-500' />,
		}),
	warning: (message: string, description?: string) =>
		toast.warning(message, {
			description,
			icon: <AlertCircle className='h-5 w-5 text-yellow-500' />,
		}),
	dismiss: () => toast.dismiss(),
}

// eslint-disable-next-line react-refresh/only-export-components
export { Toaster, enhancedToast as toast }
