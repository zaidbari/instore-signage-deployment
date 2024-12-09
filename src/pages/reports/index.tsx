import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useStorage } from '@/hooks/auth/useStorage'
import { useGetDevices } from '@/hooks/data/useGetDevices'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Separator } from '@/components/ui/separator'

export default function ReportsPage() {
	const { filteredDevicesByRegion, loading } = useGetDevices()
	const { getUserData } = useStorage()
	const network = getUserData().network
	const [startDate, setStartDate] = useState<Date>()
	const [endDate, setEndDate] = useState<Date>()

	// const api = useApi()

	function splitName(name: string) {
		if (network !== 'FW') {
			return name
		}
		const parts = name.split('_')
		return `${parts[1]} - ${parts[2]} ${parts[3] ?? ''}`
	}

	return loading ? (
		<div>Loading ...</div>
	) : (
		<div>
			<div className="mb-10 grid grid-cols-2 bg-gray-800/20 rounded-xl px-10 py-5">
				<h1 className="text-2xl font-bold">Reports</h1>
			</div>
			<div>
				<div className="grid grid-cols-3 gap-4">
					<div>
						<Label>Select a player</Label>
						<Select name="devices">
							<SelectTrigger>
								<SelectValue placeholder="Devices" />
							</SelectTrigger>
							<SelectContent>
								{filteredDevicesByRegion.map((content: any) =>
									content.devices.map((device: any) => (
										<SelectItem key={device['d2p1:Id']} value={device['d2p1:Id']}>
											{splitName(device['d2p1:Name'])}
										</SelectItem>
									))
								)}
							</SelectContent>
						</Select>
					</div>
					<div>
						<Label>Start Date</Label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={'secondary'}
									className={cn('w-full justify-start text-left font-normal', !startDate && 'text-muted-foreground')}
								>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{startDate ? format(startDate, 'PPP') : <span>Start date</span>}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0">
								<Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
							</PopoverContent>
						</Popover>
					</div>
					<div>
						<Label>End Date</Label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={'secondary'}
									className={cn('w-full justify-start text-left font-normal', !startDate && 'text-muted-foreground')}
								>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{endDate ? format(endDate, 'PPP') : <span>End date</span>}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0">
								<Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
							</PopoverContent>
						</Popover>
					</div>
				</div>
				<Button className="mt-4">Generate Report</Button>
				<Separator className="my-4" />
				<Table>
					<TableCaption>Generated report.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">ID</TableHead>
							<TableHead>File Name</TableHead>
							<TableHead>Time</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							{/* <TableCell className="font-medium">INV001</TableCell>
							<TableCell>Paid</TableCell>
							<TableCell>Credit Card</TableCell> */}
						</TableRow>
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
