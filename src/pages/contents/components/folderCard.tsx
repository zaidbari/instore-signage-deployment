import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { FolderOpen, FolderTree } from 'lucide-react'

export const FolderCard = ({ content }: any) => {
	return (
		<div
			className={cn(
				'bg-gray-800/30 flex justify-between flex-col rounded-lg p-3 md:p-4',
				!content['d2p1:HasSubFolders'] && 'cursor-not-allowed'
			)}
		>
			<div>
				{!content['d2p1:HasSubFolders'] ? (
					<div className="flex justify-between items-center">
						<FolderOpen className="h-8 w-8" />
						<Badge variant="secondary" className="font-bold">
							Empty
						</Badge>
					</div>
				) : (
					<FolderTree className="h-8 w-8" />
				)}
			</div>
			<p className="mt-2 text-lg">{content['d2p1:Name']}</p>
		</div>
	)
}
