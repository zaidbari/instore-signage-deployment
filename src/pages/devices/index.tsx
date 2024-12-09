import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { toast } from '@/components/ui/use-toast'
import { DEVICES_URL } from '@/constants/urls'
import { useApi } from '@/hooks/auth/useApi'
import { useStorage } from '@/hooks/auth/useStorage'
import { useGetDevices } from '@/hooks/data/useGetDevices'
import { Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { PlaylistLoadingskeleton } from '../playlists/components/loader'
import { TagDrawer } from './components/tagDrawer'

function extractContent(input: string): string | null {
	const match = input.match(/<([^>]+)>/)
	return match ? match[1] : null
}

function fixTags(tags: any) {
	if (!tags) {
		return []
	}
	if (!Array.isArray(tags)) {
		return [tags]
	} else {
		return tags.map((tag) => (typeof tag === 'object' && tag !== null ? tag : {}))
	}
}

export default function DevicesPage() {
	const { filteredDevices, filteredDevicesByRegion, loading } = useGetDevices()
	const [tags, setTags] = useState<any>([])
	const [filteredTags, setFilteredTags] = useState<any>([])
	const [filteredDevicesByTags, setFilteredDevicesByTags] = useState<any>([])

	const { getUserData } = useStorage()
	const network = getUserData().network
	const api = useApi()

	useEffect(() => {
		// set of all the tags
		const alltags = new Set<string>()
		filteredDevices.forEach((device: any) => {
			const deviceTags = fixTags(device['d2p1:Tags']['d4p1:KeyValueOfstringstring'])
			deviceTags.forEach((tag) => {
				alltags.add(tag['d4p1:Key'])
			})
		})

		setTags(Array.from(alltags))
	}, [filteredDevices])

	useEffect(() => {
		if (filteredTags.length === 0) {
			setFilteredDevicesByTags([])
		} else {
			const devices = filteredDevices.filter((device: any) => {
				const deviceTags = fixTags(device['d2p1:Tags']['d4p1:KeyValueOfstringstring'])
				const tags = deviceTags.map((tag) => tag['d4p1:Key'])
				return filteredTags.every((tag: any) => tags.includes(tag))
			})
			setFilteredDevicesByTags(devices)
		}
	}, [filteredTags, filteredDevices])

	function splitName(name: string) {
		if (network !== 'FW') {
			return name
		}
		const parts = name.split('_')
		return `${parts[1]} - ${parts[2]} ${parts[3] ?? ''}`
	}

	const [selectedDevices, setSelectedDevices] = useState<any>([])
	const [open, setOpen] = useState<boolean>(false)

	const handleTagDelete = async (tag: 'string', id: string) => {
		try {
			const formData = [tag]
			await api.delete(`${DEVICES_URL}/${id}/Tags/`, { data: formData })
			toast({ description: 'Tag deleted successfully' })
		} catch (error) {
			toast({
				description: 'Error Deleting tag, please try to refresh the page and try again.',
				variant: 'destructive'
			})
			console.log(error)
		}
	}
	return (
		<div className="relative">
			{open && <TagDrawer ids={selectedDevices} open={open} setOpen={setOpen} />}
			{selectedDevices.length > 0 && (
				<div className="fixed bottom-0 px-10 bg-slate-900 rounded-t-lg py-2 w-[calc(100%-5rem)]">
					<Button className="w-full" onClick={() => setOpen(true)}>
						Add tags
					</Button>
				</div>
			)}
			<div className="mb-10 grid grid-cols-2 bg-gray-800/20 rounded-xl px-10 py-5">
				<h1 className="text-2xl font-bold">Devices</h1>
			</div>

			{loading ? (
				<PlaylistLoadingskeleton />
			) : (
				<div className="mb-20">
					<div className="bg-gray-800/20 rounded-xl px-10 py-5 mb-10">
						<h1 className="text-2xl font-bold mb-4">Filter by tags</h1>
						<div className="grid md:grid-cols-4 grid-cols-1 gap-5">
							{tags.map((tag: any, index: number) => (
								<div key={index}>
									<div className="flex items-center gap-3">
										<Checkbox
											id={tag}
											checked={filteredTags.includes(tag)}
											onCheckedChange={(checked) => {
												return checked
													? setFilteredTags([...filteredTags, tag])
													: setFilteredTags(filteredTags.filter((t: any) => t !== tag))
											}}
										/>
										<label htmlFor={tag}>{extractContent(tag)}</label>
									</div>
								</div>
							))}
						</div>
					</div>
					<div>
						<div className="grid md:grid-cols-4 grid-cols-1 gap-5 px-10">
							{filteredDevicesByTags.map((device: any, index: number) => (
								<div key={index}>
									<div className="flex items-center gap-3">
										<Checkbox
											id={device['d2p1:Id']}
											checked={selectedDevices.includes(device['d2p1:Id'])}
											onCheckedChange={(checked) => {
												return checked
													? setSelectedDevices([...selectedDevices, device['d2p1:Id']])
													: setSelectedDevices(selectedDevices.filter((id: any) => id !== device['d2p1:Id']))
											}}
										/>
										<label htmlFor={device['d2p1:Id']}>{splitName(device['d2p1:Name'])}</label>
									</div>
									{device['d2p1:Tags']['d4p1:KeyValueOfstringstring'] && (
										<Collapsible>
											<CollapsibleTrigger className="text-sm text-gray-700 ml-8">Show tags?</CollapsibleTrigger>
											<CollapsibleContent className="ml-5">
												{fixTags(device['d2p1:Tags']['d4p1:KeyValueOfstringstring']).map((tag: any) => (
													<div key={tag['d4p1:Key']}>
														<div className="flex items-center">
															<Button
																variant="ghost"
																size={'sm'}
																onClick={() => handleTagDelete(tag['d4p1:Key'], device['d2p1:Id'])}
															>
																<Trash className="w-5 text-rose-500" />
															</Button>
															<Badge variant="secondary" className="text-normal">
																<p>
																	{extractContent(tag['d4p1:Key'])}: {tag['d4p1:Value']}
																</p>
															</Badge>
														</div>
													</div>
												))}
											</CollapsibleContent>
										</Collapsible>
									)}
								</div>
							))}
						</div>
					</div>
					{filteredDevicesByTags.length === 0 && (
						<div>
							{filteredDevicesByRegion.map((content: any, index: number) => (
								<div key={index}>
									<div className="bg-gray-800/20 my-5 rounded-xl px-10 py-5">
										<div className="flex items-center gap-3">
											<Checkbox
												onCheckedChange={(checked) => {
													return checked
														? setSelectedDevices(content.devices.map((device: any) => device['d2p1:Id']))
														: setSelectedDevices([])
												}}
											/>{' '}
											{content.region}
										</div>
									</div>
									<div className="grid md:grid-cols-3 gap-5 grid-cols-1 px-10">
										{content.devices.map((device: any, index: number) => (
											<div key={index}>
												<div className="flex items-center gap-3">
													<Checkbox
														id={device['d2p1:Id']}
														checked={selectedDevices.includes(device['d2p1:Id'])}
														onCheckedChange={(checked) => {
															return checked
																? setSelectedDevices([...selectedDevices, device['d2p1:Id']])
																: setSelectedDevices(selectedDevices.filter((id: any) => id !== device['d2p1:Id']))
														}}
													/>
													<label htmlFor={device['d2p1:Id']}>{splitName(device['d2p1:Name'])}</label>
												</div>
												{device['d2p1:Tags']['d4p1:KeyValueOfstringstring'] && (
													<Collapsible>
														<CollapsibleTrigger className="text-sm text-gray-700 ml-8">Show tags?</CollapsibleTrigger>
														<CollapsibleContent className="ml-5">
															{fixTags(device['d2p1:Tags']['d4p1:KeyValueOfstringstring']).map((tag: any) => (
																<div key={tag['d4p1:Key']}>
																	<div className="flex items-center">
																		<Button
																			variant="ghost"
																			size={'sm'}
																			onClick={() => handleTagDelete(tag['d4p1:Key'], device['d2p1:Id'])}
																		>
																			<Trash className="w-5 text-rose-500" />
																		</Button>
																		<Badge variant="secondary" className="text-normal">
																			<p>
																				{extractContent(tag['d4p1:Key'])}: {tag['d4p1:Value']}
																			</p>
																		</Badge>
																	</div>
																</div>
															))}
														</CollapsibleContent>
													</Collapsible>
												)}
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					)}
					{filteredDevices.length === 0 && <h1>No devices found</h1>}
				</div>
			)}
		</div>
	)
}
