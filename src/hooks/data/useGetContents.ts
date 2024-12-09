import { USER_CONTENTS_URL } from '@/constants/urls'
import { useApi } from '@/hooks/auth/useApi'
import { useStorage } from '@/hooks/auth/useStorage'
import { xmlToJson } from '@/lib/xmlParser'
import { useEffect, useState } from 'react'

export const useGetContents = () => {
	const [contents, setContents] = useState<any>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [marker, setMarker] = useState<string>('')
	const [filteredContents, setFilteredContents] = useState<any>([])

	const { getUsername } = useStorage()
	const api = useApi()

	useEffect(() => {
		let isMounted = true
		setLoading(true)

		const controller = new AbortController()
		const signal = controller.signal

		const fetchContents = async () => {
			const username = getUsername()
			try {
				const query = marker ? `?marker=${marker}` : ''

				const { data } = await api.get(USER_CONTENTS_URL + `${username}/${query}`, { signal })
				const xmlDoc = xmlToJson(data)
				if (isMounted) {
					setContents(xmlDoc)
					setFilteredContents((prev: any) => prev.concat(xmlDoc.PagedLibraryItemList.Items['d2p1:LibraryItem']))
					if (xmlDoc.PagedLibraryItemList.IsTruncated) {
						setMarker(xmlDoc.PagedLibraryItemList.NextMarker)
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

	return { contents, loading, marker, setMarker, filteredContents }
}
