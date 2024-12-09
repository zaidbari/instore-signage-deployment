import { DEVICES_URL } from '@/constants/urls'
import { useApi } from '@/hooks/auth/useApi'
import { xmlToJson } from '@/lib/xmlParser'
import { useEffect, useState } from 'react'
import { useStorage } from '../auth/useStorage'

function organizeDevicesByRegion(devices: any) {
	const regionMap: any = {}

	devices.forEach((device: any) => {
		const region = device['d2p1:Description'] ?? 'Unknown'

		// Check if the region already exists in the map
		if (!regionMap[region]) {
			regionMap[region] = []
		}

		// Add the device to the corresponding region array
		regionMap[region].push(device)
	})

	// Convert the map into an array of arrays
	const organizedDevices = Object.keys(regionMap).map((region) => ({
		region: region,
		devices: regionMap[region]
	}))

	// console.log('organizedDevices', organizedDevices)
	return organizedDevices
}

export const useGetDevices = () => {
	const [devices, setDevices] = useState<any>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [marker, setMarker] = useState<string>('')
	const [filteredDevices, setFilteredDevices] = useState<any>([])
	const [filteredDevicesByRegion, setFilteredDevicesByRegion] = useState<any>([])

	const api = useApi()
	const { getUserData } = useStorage()
	const network = getUserData().network
	useEffect(() => {
		let isMounted = true
		setLoading(true)

		const controller = new AbortController()
		const signal = controller.signal
		const query = marker ? `&marker=${marker}` : ''
		let filter = ''

		if (network == 'FW') {
			filter = "&filter=[Device].[Description] CONTAINS ANY ('Jylland', 'Sjaelland', 'Fyn')"
		} else {
			filter = ''
		}

		const fetchContents = async () => {
			try {
				const { data } = await api.get(DEVICES_URL + '?sort=[Device].[Id] ASC' + filter + query, {
					signal
				})
				const xmlDoc = xmlToJson(data)
				if (isMounted) {
					setDevices(xmlDoc)
					setFilteredDevices((prev: any) => prev.concat(xmlDoc?.PagedDeviceList?.Items['d2p1:Device'] ?? []))
					if (xmlDoc?.PagedDeviceList?.IsTruncated) {
						setMarker(xmlDoc?.PagedDeviceList?.NextMarker)
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

	useEffect(() => {
		if (filteredDevices.length > 0 && network == 'FW') {
			setFilteredDevicesByRegion(organizeDevicesByRegion(filteredDevices))
		} else {
			setFilteredDevicesByRegion([
				{
					region: 'All',
					devices: filteredDevices
				}
			])
		}
	}, [filteredDevices])

	return { devices, loading, marker, setMarker, filteredDevices, filteredDevicesByRegion }
}
