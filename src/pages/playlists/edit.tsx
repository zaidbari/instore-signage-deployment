import { useGetSinglePlaylist } from '@/hooks/data/useGetSinglePlaylist'
import { useParams } from 'react-router-dom'
import { RenderContent } from './components/renderContent'
import { RenderPlaylistContent } from './components/renderPlaylistContent'
import { useApi } from '@/hooks/auth/useApi'
import { USER_PLAYLISTS_URL } from '@/constants/urls'
import { useToast } from '@/components/ui/use-toast'

export default function PlaylistEditPage() {
	const { playlistId } = useParams<{ playlistId: string }>()
	const api = useApi()
	const { toast } = useToast()

	const { loading, setContents, contents, contentLoading, userContents, setMarker, filteredContents, playlistObj } =
		useGetSinglePlaylist(playlistId as string)
	const handleDelete = (ContentId: string) => {
		// filter out setContents
		const newContents = contents.filter((content: any) => content.ContentId !== ContentId)
		setContents((newContents as []) ?? [])
	}

	const handleAdd = ({ ContentId, FileName }: any) => {
		// add to setContents
		const newContents = (contents as any).concat({
			ContentId,
			DisplayDuration: 'PT0S',
			FileName: FileName,
			ValidityEndDate: '',
			ValidityStartDate: ''
		})
		setContents((newContents as []) ?? [])
	}

	const handleSave = async () => {
		const formData = {
			content: contents,
			SupportsAudio: playlistObj.SupportsAudio,
			SupportsVideo: playlistObj.SupportsVideo,
			SupportsImages: playlistObj.SupportsImages
		}

		try {
			const { status } = await api.put(`${USER_PLAYLISTS_URL}/${playlistId}`, formData)
			if (status === 204) {
				toast({
					description: 'Playlist updated successfully'
				})
			}
		} catch (error: any) {
			toast({
				description: error?.response?.data.message ?? 'An error occurred',
				variant: 'destructive'
			})
		}
	}
	return (
		<div>
			<div className="mb-10 bg-gray-800/20 rounded-xl px-10 py-5">
				<h1 className="text-2xl font-bold break-all">{playlistId}</h1>
			</div>
			<div className="grid md:grid-cols-3 grid-cols-1 gap-5">
				<div>
					<RenderPlaylistContent
						handleDelete={handleDelete}
						setContent={setContents}
						contents={contents}
						loading={loading}
						handleSave={handleSave}
					/>
				</div>
				<div className="col-span-2">
					<RenderContent
						handleAdd={handleAdd}
						contents={userContents}
						contentLoading={contentLoading}
						filteredContents={filteredContents}
						setContent={setContents}
						setMarker={setMarker}
					/>
				</div>
			</div>
		</div>
	)
}
