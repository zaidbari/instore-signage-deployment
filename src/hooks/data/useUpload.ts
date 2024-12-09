import { useToast } from '@/components/ui/use-toast'
import { useApi } from '@/hooks/auth/useApi'
import { useStorage } from '@/hooks/auth/useStorage'
import { useState } from 'react'

export const useUpload = () => {
	const [file, setFile] = useState<File | null>(null)
	const [open, setOpen] = useState<boolean>(false)
	const [uploading, setUploading] = useState<boolean>(false)
	const { toast } = useToast()

	const api = useApi()
	const { getUsername } = useStorage()
	const username = getUsername()

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFile(event.target.files?.[0] || null)
	}

	const handleUpload = async () => {
		if (!file) return
		setUploading(true)

		const sha1Hash = await calculateSHA1(file)
		try {
			const uploadResponse = await api.post(
				'https://api.instore-experience.com/Upload/2017/01/REST/Sessions/None/Uploads/',
				{
					fileName: file.name,
					fileSize: file.size,
					sha1Hash: sha1Hash
				},
				{
					headers: {
						'Content-Type': 'application/vnd.bsn.start.content.upload.arguments.201701+json'
					}
				}
			)

			const uploadData = uploadResponse.data
			const uploadToken = uploadData.uploadToken

			const chunkSize = 256 * 1024
			for (let offset = 0; offset < file.size; offset += chunkSize) {
				const chunk = file.slice(offset, offset + chunkSize)
				await api.post(
					`https://api.instore-experience.com/Upload/2017/01/REST/Sessions/None/Uploads/${uploadToken}/chunks/?offset=${offset}`,
					chunk,
					{
						headers: {
							'Content-Type': 'application/octet-stream'
						}
					}
				)
			}

			const completeUploadResponse = await api.put(
				`https://api.instore-experience.com/Upload/2017/01/REST/Sessions/None/Uploads/${uploadToken}/`,
				{
					fileName: file.name,
					fileSize: file.size,
					sha1Hash: sha1Hash,
					virtualPath: `\\Users\\${username}\\`
				},
				{
					headers: {
						'Content-Type': 'application/vnd.bsn.complete.content.upload.arguments.201701+json'
					}
				}
			)

			console.log('Complete upload response:', completeUploadResponse.data)
			if (completeUploadResponse.data.state === 'Completed') {
				setOpen(false)
				toast({
					description: 'Uploaded file successfully'
				})
			}
		} catch (error: any) {
			console.error('Upload failed', error)
			toast({
				description: error.message,
				variant: 'destructive'
			})
		} finally {
			setUploading(false)
		}
	}

	const calculateSHA1 = async (file: File) => {
		const arrayBuffer = await file.arrayBuffer()
		const hashBuffer = await crypto.subtle.digest('SHA-1', arrayBuffer)
		const hashArray = Array.from(new Uint8Array(hashBuffer))
		const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
		return hashHex
	}

	return { handleFileChange, handleUpload, open, setOpen, uploading, file, setFile }
}
