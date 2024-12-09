import { Button } from '@/components/ui/button'
import { memo } from 'react'
import { FolderCard } from '@/pages/contents/components/folderCard'
import { MediaCard } from './mediaCard'

const Content = ({ contents, setMarker, filteredContents, contentLoading, handleAdd }: any) => {
	return contentLoading ? (
		<div>Loading user contents</div>
	) : (
		<div className="mb-10">
			<div className="grid md:grid-cols-3 mb-10  grid-cols-1 gap-10">
				{contents &&
					filteredContents
						.sort((a: any, b: any) => ('d2p1:HasSubFolders' in b ? 1 : 0) - ('d2p1:HasSubFolders' in a ? 1 : 0))
						.map((content: any) =>
							'd2p1:HasSubFolders' in content ? (
								<FolderCard key={content['d2p1:Id']} content={content} />
							) : (
								<MediaCard handleAdd={handleAdd} key={content['d2p1:Id']} content={content} />
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
