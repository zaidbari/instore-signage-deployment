import { Input } from '@/components/ui/input'
import { useGetPlaylists } from '@/hooks/data/useGetPlaylists'

import { PlaylistCard } from './components/playlistCard'
import { PlaylistLoadingskeleton } from './components/loader'

export default function PlaylistsPage() {
	const { contents, loading, filteredContents, setFilteredContents } = useGetPlaylists()
	const handleSearch = (searchQuery: string) => {
		const data = contents?.PagedDynamicPlaylistList?.Items['d2p1:DynamicPlaylist']
		const filteredContents = data.filter((content: any) =>
			content['d2p1:Name'].toLowerCase().includes(searchQuery.toLowerCase())
		)
		setFilteredContents(filteredContents)
	}

	return (
		<div>
			<div className="mb-10 grid grid-cols-2 bg-gray-800/20 rounded-xl px-10 py-5">
				<h1 className="text-2xl font-bold">Spillelister</h1>
				<div className="text-right flex flex-row gap-2">
					<Input placeholder="Søg efter spillelister" onChange={(e) => handleSearch(e.target.value)} />
				</div>
			</div>
			{loading ? (
				<PlaylistLoadingskeleton />
			) : (
				<div className="mb-10">
					<div className="grid md:grid-cols-3 gap-5 grid-cols-1">
						{filteredContents.map((content: any, index: number) => (
							<PlaylistCard key={index} content={content} />
						))}
					</div>
					{filteredContents.length === 0 && <h1>No playlists found</h1>}
				</div>
			)}
		</div>
	)
}
