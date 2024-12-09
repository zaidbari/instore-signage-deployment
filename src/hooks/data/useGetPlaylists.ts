import { USER_PLAYLISTS_URL } from '@/constants/urls'
import { useApi } from '@/hooks/auth/useApi'
import { xmlToJson } from '@/lib/xmlParser'
import { useEffect, useState } from 'react'

export const useGetPlaylists = () => {
	const [contents, setContents] = useState<any>(null)
	const [marker, setMarker] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(true)
	const [filteredContents, setFilteredContents] = useState<any>([])

	const api = useApi()

	useEffect(() => {
		let isMounted = true
		setLoading(true)

		const controller = new AbortController()
		const signal = controller.signal

		const fetchContents = async () => {
			try {
				// add a query param to the URL to force a re-fetch
				const query = marker ? `?marker=${marker}` : ''
				const { data } = await api.get(`${USER_PLAYLISTS_URL}${query}`, { signal })
				const xmlDoc = xmlToJson(data)

				if (isMounted) {
					setContents(xmlDoc)
					setFilteredContents((prev: any) =>
						prev.concat(xmlDoc?.PagedDynamicPlaylistList?.Items['d2p1:DynamicPlaylist'])
					)

					if (xmlDoc?.PagedDynamicPlaylistList?.IsTruncated) {
						setMarker(xmlDoc?.PagedDynamicPlaylistList?.NextMarker)
					} else {
						setLoading(false)
					}
				}
			} catch (error) {
				if (isMounted) {
					setLoading(false)
				}
			}
		}
		fetchContents()

		return () => {
			isMounted = false
			controller.abort()
		}
	}, [marker])

	return { contents, loading, filteredContents, setFilteredContents, marker, setMarker }
}
