import { Button } from '@/components/ui/button'
import { FolderCard } from './folderCard'
import { MediaCard } from './mediaCard'
import { memo } from 'react'

const Content = ({ contents, setMarker, filteredContents }: any) => {
	return (
		<div className="mb-10">
			<div className="grid md:grid-cols-3 mb-10 lg:grid-cols-5 grid-cols-1 gap-10">
				{contents &&
					filteredContents
						.sort((a: any, b: any) => ('d2p1:HasSubFolders' in b ? 1 : 0) - ('d2p1:HasSubFolders' in a ? 1 : 0))
						.map((content: any) =>
							'd2p1:HasSubFolders' in content ? (
								<FolderCard key={content['d2p1:Id']} content={content} />
							) : (
								<MediaCard key={content['d2p1:Id']} content={content} />
							)
						)}
			</div>
			{contents.PagedLibraryItemList.IsTruncated && (
				<Button onClick={() => setMarker(contents.PagedLibraryItemList.NextMarker)}>Load More</Button>
			)}
		</div>
	)
}

export const RenderContent = memo(Content)
