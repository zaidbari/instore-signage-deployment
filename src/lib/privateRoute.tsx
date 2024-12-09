import { Navbar } from '@/components/ui/navbar'
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRoutes() {
	const token = localStorage.getItem('tokens')
	const user = localStorage.getItem('user')

	return token && user ? (
		<>
			<Navbar />
			<section className="px-10">
				<Outlet />
			</section>
		</>
	) : (
		<Navigate to="/" />
	)
}
