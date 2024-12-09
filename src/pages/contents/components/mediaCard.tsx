import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/use-toast'

import { BASE_URL } from '@/constants/urls'
import { useApi } from '@/hooks/auth/useApi'
import { cn } from '@/lib/utils'
import { TagDrawer } from './tagDrawer'
import { Menu } from './menu'

export const MediaCard = ({ content }: any) => {
	const api = useApi()
	const { toast } = useToast()

	const [display, setDisplay] = useState<boolean>(true)
	const [open, setOpen] = useState<boolean>(false)

	const _handleDelete = async () => {
		const id = content['d2p1:Id']
		try {
			await api.delete(`${BASE_URL}/Content/${id}/`)
			toast({
				description: 'Content deleted successfully'
			})
			setDisplay(false)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			{open && <TagDrawer content={content} open={open} setOpen={setOpen} />}
			<div className={cn('bg-gray-800/30 rounded-lg relative', display ? 'block' : 'hidden')}>
				<img
					loading="lazy"
					src={content['d2p1:ThumbPath']}
					alt="placeholder"
					className="rounded-t-lg aspect-video w-full"
				/>
				<Menu setOpen={setOpen} content={content} _handleDelete={_handleDelete} />
				<div className="p-3">
					<Badge variant="secondary" className="font-bold">
						{content['d2p1:MediaType']}
					</Badge>
					<h2 className="text-md font-bold mt-4">Filename</h2>
					<p className="text-sm break-words">{content['d2p1:FileName']}</p>
				</div>
			</div>
		</>
	)
}
