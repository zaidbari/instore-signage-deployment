import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn } from 'lucide-react'

import { useLogin } from '@/hooks/auth/useLogin'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Alert } from '@/components/ui/alert'

export default function LoginPage() {
	const { handleSubmit, showPassword, setShowPassword, availableNetworks, loading, error } = useLogin()
	const navigate = useNavigate()

	const token = localStorage.getItem('tokens')
	const user = localStorage.getItem('user')

	useEffect(() => {
		if (token && user) navigate('/dashboard', { replace: true })
	}, [])

	return (
		!token &&
		!user && (
			<main className="flex items-center justify-center h-screen w-screen">
				<form onSubmit={handleSubmit}>
					<Card className="w-[300px]">
						<CardHeader>
							<CardTitle className="text-2xl">Login</CardTitle>
							{error && (
								<div>
									<Alert variant="destructive" className="mt-3">
										{error}
									</Alert>
								</div>
							)}
						</CardHeader>
						<CardContent className="grid gap-4">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									name="email"
									placeholder="m@example.com"
									autoComplete="email"
									disabled={availableNetworks.length > 0}
									required
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									type={showPassword ? 'text' : 'password'}
									name="password"
									placeholder="Password"
									autoComplete="current-password"
									disabled={availableNetworks.length > 0}
									required
								/>
								<div className="flex mt-2 items-center space-x-2">
									<Checkbox id="showPassword" name="showPassword" onClick={() => setShowPassword((prev) => !prev)} />
									<label
										htmlFor="showPassword"
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										Show Password?
									</label>
								</div>
							</div>
							{availableNetworks.length > 0 && (
								<div className="grid gap-2">
									<Separator className="my-4" />
									<Select name="network">
										<SelectTrigger>
											<SelectValue placeholder="Network" />
										</SelectTrigger>
										<SelectContent>
											{availableNetworks.map((item) => (
												<SelectItem key={item} value={item}>
													{item}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							)}
						</CardContent>
						<CardFooter>
							<Button className="w-full" type="submit" disabled={loading}>
								<LogIn className="mr-2 h-4 w-4" /> Sign in
							</Button>
						</CardFooter>
					</Card>
				</form>
			</main>
		)
	)
}
