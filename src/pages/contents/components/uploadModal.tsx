import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { UploadCloud } from 'lucide-react'
import { useUpload } from '@/hooks/data/useUpload'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

export const UploadModal = () => {
	const { handleFileChange, handleUpload, open, setOpen, uploading } = useUpload()

	return (
		<div className="mb-10 flex items-center justify-between bg-gray-800/20 rounded-xl px-10 py-5">
			<h1 className="text-2xl font-bold">Handter</h1>
			<div className="text-right">
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger>
						<div className="flex items-center justify-between cursor-pointer">
							<UploadCloud className="mr-3" /> Upload
						</div>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Upload a file</DialogTitle>
							<DialogDescription>
								<span className="flex gap-3 mt-4">
									<Input accept="image/*,video/*,audio/*" id="file" type="file" onChange={handleFileChange} />
									<Button variant={'secondary'} onClick={handleUpload} disabled={uploading}>
										{uploading ? <Loader2 className="animate-spin" /> : null}
										Upload
									</Button>
								</span>
							</DialogDescription>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	)
}
