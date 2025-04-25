import { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import FileDropzone from './FileDropzone'
import { useUploadDocumentMutation } from '@/service/jobsApi'
import { convertLanguage } from '@/util/function'
import FileLanguage from './FileLanguage'

interface SingleFileProps {
	onLoadingChange?: (isLoading: boolean) => void
	onLoadingError?: (isError: boolean) => void
	onTaskCreated?: (taskId: string) => void
}

const SingleFile: React.FC<SingleFileProps> = ({
	onLoadingChange,
	onLoadingError,
	onTaskCreated,
}) => {
	const [currentFile, setCurrentFile] = useState<File | null>(null)
	const [masterLang, setMasterLang] = useState<string>('English')
	const [slaveLang, setSlaveLang] = useState<string>('Uzbek')
	const [uploadDocument, { isLoading, reset }] = useUploadDocumentMutation()

	useEffect(() => {
		if (onLoadingChange) {
			onLoadingChange(isLoading)
		}
	}, [isLoading, onLoadingChange])

	const handleUpload = async () => {
		if (!currentFile) {
			toast.error('Please upload the master file before submitting.')
			return
		}
		try {
			const response = await uploadDocument({
				master_lang: convertLanguage(masterLang),
				name: currentFile.name,
				type: 'solo',
				master_file: currentFile,
				slave_lang: convertLanguage(slaveLang),
				slave_file: null,
			}).unwrap()
			toast.success('Document uploaded successfully!')
			setCurrentFile(null)
			if (onTaskCreated) {
				onTaskCreated(response.id)
			}
			reset()
		} catch (error) {
			toast.error('Failed to translate document.')
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
			<FileDropzone
				title='Upload a single file'
				file={currentFile}
				setFile={setCurrentFile}
			/>
			<FileLanguage
				masterLang={masterLang}
				setMasterLang={setMasterLang}
				slaveLang={slaveLang}
				setSlaveLang={setSlaveLang}
			/>
			<Button
				className='w-full inline mb-2 sm:mb-3 text-sm sm:text-base'
				onClick={handleUpload}
				disabled={isLoading}
			>
				Translate
			</Button>
		</div>
	)
}

export default SingleFile
