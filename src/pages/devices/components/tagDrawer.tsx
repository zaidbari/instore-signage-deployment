import { Button } from '@/components/ui/button'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { DEVICES_URL } from '@/constants/urls'
import { useApi } from '@/hooks/auth/useApi'
import { FormEvent, useState } from 'react'

export const TagDrawer = ({ ids, open, setOpen }: any) => {
	const [tags, setTags] = useState<any[]>([])

	const api = useApi()

	const handleSubmit = async () => {
		const tagArray: any = []
		for (let i = 0; i < Object.keys(tags).length / 2; i++) {
			const key = tags[`tag[${i}]` as any]
			const value = tags[`value[${i}]` as any]
			tagArray.push({ [key]: value ?? '' })
		}

		try {
			const formData = tagArray.reduce((acc: any, tag: any) => {
				const tagKey = `[Device].<${Object.keys(tag)[0]}>`
				const tagValue = `${Object.values(tag)[0]}`
				acc[tagKey as any] = tagValue
				return acc
			}, {})

			ids.forEach(async (id: number) => {
				console.log(id, formData)
				await api.post(`${DEVICES_URL}/${id}/Tags`, formData)
			})

			toast({ description: 'Tags updated successfully' })
		} catch (error) {
			console.log(error)
			const msg = (error as any).response.data.split('<Message>')[1].split('</Message>')[0]
			toast({ description: msg, variant: 'destructive' })
		}
	}

	const handleTagChange = (e: FormEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget
		setTags((prev) => ({ ...prev, [name]: value }))
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerContent>
				<div className="container py-10">
					<DrawerHeader className="text-left ">
						<DrawerTitle>Add / Edit Tags</DrawerTitle>
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
