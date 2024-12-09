import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { PlusIcon } from 'lucide-react'

export const MediaCard = ({ content, handleAdd }: any) => {
	return (
		<div className={cn('bg-gray-800/30 rounded-lg relative')}>
			<img
				loading="lazy"
				src={content['d2p1:ThumbPath']}
				alt="placeholder"
				className="rounded-t-lg aspect-video w-full"
			/>
			<div className="absolute top-0 right-0">
				<PlusIcon
					className="bg-orange-500 rounded-tr-lg p-1 h-8 w-8"
					onClick={() => handleAdd({ FileName: content['d2p1:FileName'], ContentId: content['d2p1:Id'] })}
				/>
			</div>

			<div className="p-3">
				<Badge variant="secondary" className="font-bold">
					{content['d2p1:MediaType']}
				</Badge>
				<h2 className="text-md font-bold mt-4">Filename</h2>
				<p className="text-sm break-words">{content['d2p1:FileName']}</p>
			</div>
		</div>
	)
}
