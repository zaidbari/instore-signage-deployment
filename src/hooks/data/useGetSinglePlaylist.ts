import { USER_PLAYLISTS_URL } from '@/constants/urls'
import { xmlToJson } from '@/lib/xmlParser'
import { useGetContents } from './useGetContents'
import { useEffect, useState } from 'react'
import { useApi } from '@/hooks/auth/useApi'

export const useGetSinglePlaylist = (playlistId: string) => {
	const { loading: contentLoading, contents: userContents, setMarker, filteredContents } = useGetContents()

	const [contents, setContents] = useState<[]>([])
	const [playlistObj, setPlaylistObj] = useState<any>([])
	const [loading, setLoading] = useState<boolean>(true)

	const api = useApi()

	useEffect(() => {
		let isMounted = true
		setLoading(true)

		const controller = new AbortController()
		const signal = controller.signal

		const fetchContents = async () => {
			try {
				const { data } = await api.get(`${USER_PLAYLISTS_URL}/${playlistId}`, { signal })
				const xmlDoc = xmlToJson(data)

				setPlaylistObj(xmlDoc.DynamicPlaylist)
				if (isMounted) {
					if (xmlDoc.DynamicPlaylist.Content) {
						if (Array.isArray(xmlDoc.DynamicPlaylist.Content.DynamicPlaylistContent)) {
							setContents(xmlDoc.DynamicPlaylist.Content.DynamicPlaylistContent)
						} else {
							setContents([xmlDoc.DynamicPlaylist.Content.DynamicPlaylistContent] as any)
						}
					} else {
						setContents([])
					}
					setLoading(false)
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
	}, [playlistId])

	return {
		loading,
		contents,
		setContents,
		setLoading,
		contentLoading,
		userContents,
		setMarker,
		filteredContents,
		playlistObj,
		setPlaylistObj
	}
}
