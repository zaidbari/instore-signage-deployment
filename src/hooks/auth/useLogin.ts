import { LOGIN_URL } from '@/constants/urls'
import axios from 'axios'
import { useState } from 'react'
import { useStorage } from './useStorage'

export const useLogin = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false)
	const [availableNetworks, setAvailableNetworks] = useState<string[]>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const { login } = useStorage()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError(null)

		const target = e.target as typeof e.target & {
			email: { value: string }
			password: { value: string }
			network?: { value: string }
		}

		const password = target.password.value
		const network = target.network?.value
		const email = network ? `${network}/${target.email.value}` : target.email.value
		const scope = network ? 'Full' : 'Self'

		const urlencoded = new URLSearchParams()
		urlencoded.append('username', email)
		urlencoded.append('password', password)
		urlencoded.append('scope', scope)
		urlencoded.append('grant_type', 'password')

		axios
			.post(LOGIN_URL, urlencoded)
			.then(({ data }) => {
				if (data.networkNames) setAvailableNetworks(data.networkNames.split(','))
				else {
					login({
						...data,
						network
					})
				}
			})
			.catch(({ response }: any) => {
				setError(response.data.error_description)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	return {
		showPassword,
		setShowPassword,
		availableNetworks,
		loading,
		error,
		handleSubmit
	}
}
