import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormEvent, useEffect, useState } from 'react'
import { toast } from '@/components/ui/use-toast'
import { useApi } from '@/hooks/auth/useApi'
import { BASE_URL } from '@/constants/urls'
import { Trash } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

function extractContent(input: string): string | null {
	const match = input.match(/<([^>]+)>/)
	return match ? match[1] : null
}

export const TagDrawer = ({ content, open, setOpen }: any) => {
	const [tags, setTags] = useState<any[]>([])
	const [existingTags, setExistingTags] = useState<any[]>([])

	const api = useApi()

	useEffect(() => {
		const tags = content['d2p1:Tags']['d4p1:KeyValueOfstringstring']
		if (!tags) {
			setExistingTags([])
		} else {
			if (!Array.isArray(tags)) setExistingTags([tags])
			else setExistingTags(tags)
		}
	}, [content])

	const handleSubmit = async () => {
		const tagArray: any = []
		for (let i = 0; i < Object.keys(tags).length / 2; i++) {
			const key = tags[`tag[${i}]` as any]
			const value = tags[`value[${i}]` as any] ?? '' // Replace null with an empty string
			tagArray.push({ [key]: value ?? '' })
		}

		try {
			const formData = tagArray.reduce((acc: any, tag: any) => {
				const tagKey = `[Content].<${Object.keys(tag)[0]}>`
				const tagValue = `${Object.values(tag)[0]}`
				acc[tagKey as any] = tagValue
				return acc
			}, {})

			await api.post(`${BASE_URL}/Content/${content['d2p1:Id']}/Tags`, formData)
			toast({ description: 'Tags updated successfully' })
			setExistingTags((prev) =>
				prev.concat({
					'd4p1:Key': 'String::[Content].<' + Object.keys(tagArray[0])[0] + '>',
					'd4p1:Value': Object.values(tagArray[0])[0] ?? ''
				})
			)
		} catch (error) {
			const msg = (error as any).response.data.split('<Message>')[1].split('</Message>')[0]
			toast({ description: msg, variant: 'destructive' })
		}
	}

	const handleTagChange = (e: FormEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget
		setTags((prev) => ({ ...prev, [name]: value }))
	}

	const handleTagDelete = async (tag: any) => {
		try {
			const formData = [tag]
			await api.delete(`${BASE_URL}/Content/${content['d2p1:Id']}/Tags/`, { data: formData })
			toast({ description: 'Tag deleted successfully' })
			setExistingTags((prev) => prev.filter((existingTag: any) => existingTag['d4p1:Key'] !== tag))
		} catch (error) {
			toast({
				description: 'Error Deleting tag, please try to refresh the page and try again.',
				variant: 'destructive'
			})
		}
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerContent>
				<div className="container py-10">
					<DrawerHeader className="text-left ">
						<DrawerTitle className="mb-5">Delete Tags of {content['d2p1:FileName']}</DrawerTitle>
						{existingTags.map((tag: any) => (
							<div key={tag['d4p1:Key']}>
								<div className="flex items-center">
									<Button variant="ghost" size={'sm'} onClick={() => handleTagDelete(tag['d4p1:Key'])}>
										<Trash className="w-5 text-rose-500" />
									</Button>
									<Badge variant="secondary" className="text-normal">
										{extractContent(tag['d4p1:Key'])}: {tag['d4p1:Value']}
									</Badge>
								</div>
							</div>
						))}

						<hr className="my-4" />
						<DrawerTitle>Add / Edit Tags of {content['d2p1:FileName']}</DrawerTitle>
						<DrawerDescription>Make changes to content tags here. Click save when you're done.</DrawerDescription>
						<div className="mt-5">
							<div className="flex gap-5 mb-5">
								<Input
									name="tag[0]"
									className="col-span-2"
									onChange={handleTagChange}
									type="text"
									placeholder="Tag Name (required)"
								/>
								<Input
									name="value[0]"
									className="col-span-2"
									onChange={handleTagChange}
									type="text"
									placeholder="Tag Value (optional)"
								/>
							</div>
							<div className="flex gap-5 mb-5">
								<Input
									name="tag[1]"
									className="col-span-2"
									onChange={handleTagChange}
									type="text"
									placeholder="Tag Name (required)"
								/>
								<Input
									name="value[1]"
									className="col-span-2"
									onChange={handleTagChange}
									type="text"
									placeholder="Tag Value (optional)"
								/>
							</div>
							<div className="flex gap-5 mb-5">
								<Input
									name="tag[2]"
									className="col-span-2"
									onChange={handleTagChange}
									type="text"
									placeholder="Tag Name (required)"
								/>
								<Input
									name="value[2]"
									className="col-span-2"
									onChange={handleTagChange}
									type="text"
									placeholder="Tag Value (optional)"
								/>
							</div>
							<div className="flex gap-5 mb-5">
								<Input
									name="tag[3]"
									className="col-span-2"
									onChange={handleTagChange}
									type="text"
									placeholder="Tag Name (required)"
								/>
								<Input
									name="value[3]"
									className="col-span-2"
									onChange={handleTagChange}
									type="text"
									placeholder="Tag Value (optional)"
								/>
							</div>
						</div>
					</DrawerHeader>

					<DrawerFooter className="pt-2 grid gap-5 grid-cols-2">
						<Button onClick={handleSubmit}>Save</Button>
						<DrawerClose asChild>
							<Button variant="outline">Cancel</Button>
						</DrawerClose>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	)
}
