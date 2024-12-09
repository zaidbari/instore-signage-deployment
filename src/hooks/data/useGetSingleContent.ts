import { BASE_URL } from '@/constants/urls'
import { useApi } from '@/hooks/auth/useApi'
import { xmlToJson } from '@/lib/xmlParser'
import { useEffect, useState } from 'react'

export const useGetSingleContent = (id: string) => {
	const [content, setContent] = useState<any>(null)
	const [loading, setLoading] = useState<boolean>(true)

	const api = useApi()

	useEffect(() => {
		let isMounted = true
		setLoading(true)

		const controller = new AbortController()
		const signal = controller.signal

		const fetchContents = async () => {
			try {
				const { data } = await api.get(BASE_URL + `/Content/${id}`, { signal })
				const xmlDoc = xmlToJson(data)
				if (isMounted) {
					setContent(xmlDoc.LibraryItem)
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
	}, [])

	return { content, loading }
}
