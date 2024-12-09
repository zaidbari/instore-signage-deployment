import { Skeleton } from '@/components/ui/skeleton'
import { memo } from 'react'

const Loader = () => {
	return (
		<div className="grid md:grid-cols-3 lg:grid-cols-5 grid-cols-1 gap-10">
			{Array.from({ length: 10 }).map((_, index) => (
				<div className="flex flex-col space-y-3" key={index}>
					<Skeleton className="aspect-video rounded-xl" />
					<div className="space-y-2">
						<Skeleton className="h-4" />
						<Skeleton className="h-4" />
					</div>
				</div>
			))}
		</div>
	)
}

export const ContentLoadingskeleton = memo(Loader)
