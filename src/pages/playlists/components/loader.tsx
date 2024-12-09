import { Skeleton } from '@/components/ui/skeleton'
import { memo } from 'react'

const Loader = () => {
	return (
		<div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-10">
			{Array.from({ length: 10 }).map((_, index) => (
				<div className="space-y-2" key={index}>
					<Skeleton className="h-20" />
				</div>
			))}
		</div>
	)
}

export const PlaylistLoadingskeleton = memo(Loader)
