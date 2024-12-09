import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SpeedInsights } from '@vercel/speed-insights/react'

/* --------------------------------- Helpers -------------------------------- */
import PrivateRoutes from '@/lib/privateRoute'

/* ------------------------------ Ui Components ----------------------------- */
import { ThemeProvider } from '@/components/theme/theme-provider'
import { Toaster } from '@/components/ui/toaster'

/* ---------------------------------- Pages --------------------------------- */
import LoginPage from '@/pages/login'
import DashboardPage from '@/pages/dashboard'
import ContentsPage from '@/pages/contents'
import PlaylistsPage from '@/pages/playlists'
import PlaylistEditPage from '@/pages/playlists/edit'
import DevicesPage from '@/pages/devices'

/* ------------------------------ Global styles ----------------------------- */
import '@/styles/globals.css'
import ContentPlanningPage from './pages/contents/planning'
import ReportsPage from './pages/reports'

const router = createBrowserRouter([
	{
		path: '/',
		element: <LoginPage />
	},
	{
		element: <PrivateRoutes />,
		children: [
			{
				path: '/dashboard',
				element: <DashboardPage />
			},
			{
				path: '/reports',
				element: <ReportsPage />
			},
			{
				path: '/contents',
				children: [
					{
						path: '/contents',
						element: <ContentsPage />
					},
					{
						path: '/contents/:contentId',
						element: <ContentPlanningPage />
					}
				]
			},
			{
				path: '/playlists',
				element: <PlaylistsPage />
			},
			{
				path: '/playlists/:playlistId',
				element: <PlaylistEditPage />
			},
			{
				path: '/devices',
				element: <DevicesPage />
			}
		]
	}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<SpeedInsights />
			<RouterProvider router={router} />
			<Toaster />
		</ThemeProvider>
	</React.StrictMode>
)
