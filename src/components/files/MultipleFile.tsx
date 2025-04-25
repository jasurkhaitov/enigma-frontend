import { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import FileDropzone from './FileDropzone'
import FileLanguage from './FileLanguage'
import { useUploadDocumentMutation } from '@/service/jobsApi'
import { convertLanguage } from '@/util/function'

interface MultipleFileProps {
	onLoadingChange?: (isLoading: boolean) => void
	onLoadingError?: (isError: boolean) => void
	onTaskCreated?: (taskId: string) => void
}

const MultipleFile: React.FC<MultipleFileProps> = ({
	onLoadingChange,
	onLoadingError,
	onTaskCreated,
}) => {
	const [previousFile, setPreviousFile] = useState<File | null>(null)
	const [currentFile, setCurrentFile] = useState<File | null>(null)
	const [masterLang, setMasterLang] = useState<string>('English')
	const [slaveLang, setSlaveLang] = useState<string>('Uzbek')
	const [uploadDocument, { isLoading, reset }] = useUploadDocumentMutation()

	useEffect(() => {
		if (onLoadingChange) {
			onLoadingChange(isLoading)
		}
	}, [isLoading, onLoadingChange])

	const handleCompare = async () => {
		if (!previousFile || !currentFile) {
			toast.error('Please upload both files before submitting.')
			return
		}

		try {
			const response = await uploadDocument({
				master_lang: convertLanguage(masterLang),
				slave_lang: convertLanguage(slaveLang),
				name: previousFile.name,
				type: 'dual',
				master_file: previousFile,
				slave_file: currentFile,
			}).unwrap()

			// toast.success('Document uploaded successfully!')
			setPreviousFile(null)
			setCurrentFile(null)

			if (onTaskCreated) {
				onTaskCreated(response.id)
			}
		} catch (error) {
			// toast.error('Failed to compare document.')
			console.error('Upload Error:', error)
			if (onLoadingError) {
				onLoadingError(true)
			}
			if (onLoadingChange) {
				onLoadingChange(false)
			}
			reset()
		}
	}

	return (
		<div className='w-full space-y-4 sm:space-y-6'>
			<div className='flex flex-col md:flex-row gap-4 sm:gap-6'>
				<FileDropzone
					title='Master Language Doc'
					file={previousFile}
					setFile={setPreviousFile}
				/>
				<FileDropzone
					title='Slave Language Doc'
					file={currentFile}
					setFile={setCurrentFile}
				/>
			</div>
			<FileLanguage
				masterLang={masterLang}
				setMasterLang={setMasterLang}
				slaveLang={slaveLang}
				setSlaveLang={setSlaveLang}
			/>
			<Button
				className='w-full mb-2 sm:mb-3 inline text-sm sm:text-base'
				onClick={handleCompare}
				disabled={isLoading}
			>
				Reconcile
			</Button>
		</div>
	)
}

export default MultipleFile
