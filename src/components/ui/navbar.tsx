import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useStorage } from '@/hooks/auth/useStorage'
import { MenuIcon, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
	const { logout } = useStorage()

	return (
		<nav className="px-10 grid w-full grid-cols-2 gap-10 my-5">
			<Link className="text-2xl font-bold" to="/dashboard">
				InstoreX
			</Link>
			<div className="space-x-4 text-right">
				<DropdownMenu>
					<DropdownMenuTrigger className="ring-0 outline-none focus:outline-none focus:right-0">
						<div className="flex gap-3">
							<UserRound />
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<button onClick={logout}>Logout</button>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				<DropdownMenu>
					<DropdownMenuTrigger className="ring-0 outline-none focus:outline-none focus:right-0">
						<div className="flex gap-3">
							<MenuIcon />
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>
							<Link to="/dashboard">Dashboard</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link to="/contents">Content</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link to="/playlists">Live Content</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link to="/devices">Devices</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link to="/reports">Reports</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</nav>
	)
}
