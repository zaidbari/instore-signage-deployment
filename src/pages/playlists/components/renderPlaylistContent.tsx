import { Button } from '@/components/ui/button'
import { Trash2Icon } from 'lucide-react'

export const RenderPlaylistContent = ({ contents, loading, handleDelete, handleSave }: any) => {
	return loading ? (
		<div>Loading playlist contents</div>
	) : (
		<div>
			{contents.length ? (
				contents.map((content: any, index: number) => (
					<div className={'bg-gray-800/30 break-all mb-3 rounded-lg p-3 flex justify-between'} key={index}>
						<p className="break-all">{content.FileName.split('_').join(' ')}</p>
						<div className="text-right">
							<Button variant={'secondary'} className="w-10 p-3" onClick={() => handleDelete(content.ContentId)}>
								<Trash2Icon className="h-6 w-6 text-rose-500" />
							</Button>
						</div>
					</div>
				))
			) : (
				<div>No contents</div>
			)}
			<Button onClick={handleSave} className="mt-10" variant={'default'}>
				Save
			</Button>
		</div>
	)
}
