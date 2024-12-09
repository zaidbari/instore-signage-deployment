import { ContentLoadingskeleton } from './components/loader'
import { RenderContent } from './components/renderContent'
import { UploadModal } from './components/uploadModal'
import { useGetContents } from '@/hooks/data/useGetContents'

export default function ContentsPage() {
	const { loading, contents, setMarker, filteredContents } = useGetContents()

	return (
		<main>
			<UploadModal />
			{loading ? (
				<ContentLoadingskeleton />
			) : (
				<RenderContent contents={contents} filteredContents={filteredContents} setMarker={setMarker} />
			)}
		</main>
	)
}
