import { Button } from '@/components/ui/button'
import { PencilIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

export const PlaylistCard = ({ content }: any) => {
	return (
		<div className={'bg-gray-800/30 rounded-lg p-3 items-center grid grid-cols-2 relative'}>
			<p>{content['d2p1:Name']}</p>
			<div className="text-right">
				<Button variant={'secondary'} className="w-10 p-3">
					<Link to={`/playlists/${content['d2p1:Name']}`}>
						<PencilIcon className="h-6 w-6" />
					</Link>
				</Button>
			</div>
		</div>
	)
}
