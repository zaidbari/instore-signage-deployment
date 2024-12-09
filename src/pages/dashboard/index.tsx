import { Airplay, CloudUpload, FileIcon, Radio } from 'lucide-react'

export default function DashboardPage() {
	return (
		<main>
			<div className="text-center mb-10 bg-gray-800/20 rounded-xl p-10">
				<h1 className="text-2xl font-bold">Velkommen til InstoreX</h1>
				<p className="text-lg mt-2">Klik på kasserne nedenfor for at udføre ønsket handling</p>
			</div>
			<div className="grid md:grid-cols-4 grid-cols-1 text-center gap-10">
				{/* <div className="hover:bg-gray-800 bg-gray-800/20 transition-all duration-150 rounded-xl p-10">
					<PencilRuler className="h-40 w-40 block mx-auto" />
					<span className="text-lg mt-10 block">Skab Content</span>
				</div> */}
				<a href="/contents" className="hover:bg-gray-800 bg-gray-800/20 transition-all duration-150 rounded-xl p-10">
					<CloudUpload className="h-40 w-40 block mx-auto" />
					<span className="text-lg mt-10 block">Content</span>
				</a>
				<a href="/playlists" className="hover:bg-gray-800 bg-gray-800/20 transition-all duration-150 rounded-xl p-10">
					<Radio className="h-40 w-40 block mx-auto" />
					<span className="text-lg mt-10 block">Live Content</span>
				</a>
				<a href="/devices" className="hover:bg-gray-800 bg-gray-800/20 transition-all duration-150 rounded-xl p-10">
					<Airplay className="h-40 w-40 block mx-auto" />
					<span className="text-lg mt-10 block">Devices</span>
				</a>
				<a href="/reports" className="hover:bg-gray-800 bg-gray-800/20 transition-all duration-150 rounded-xl p-10">
					<FileIcon className="h-40 w-40 block mx-auto" />
					<span className="text-lg mt-10 block">Reports</span>
				</a>
			</div>
		</main>
	)
}
