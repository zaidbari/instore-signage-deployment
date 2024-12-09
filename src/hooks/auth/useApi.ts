import { BASE_URL, LOGIN_URL } from '@/constants/urls'
import axios from 'axios'
import { useStorage } from './useStorage'

export const useApi = () => {
	const { getTokens, setTokens, logout } = useStorage()
	const api = axios.create({ baseURL: BASE_URL })

	api.interceptors.request.use(
		async (config) => {
			const { access_token } = getTokens()
			if (!config.headers['Authorization']) {
				config.headers['Authorization'] = `Bearer ${access_token}`
			}
			return config
		},
		(error) => {
			console.error(error)
			return Promise.reject(error)
		}
	)

	api.interceptors.response.use(
		(response) => response,
		async (error) => {
			const { response, config } = error
			const prevRequest = config

			if (error.message === 'canceled') {
				return Promise.reject({ message: 'Request cancelled' })
			}

			if (response && response.status === 401 && !prevRequest.sent) {
				prevRequest.sent = true
				const { refresh_token } = getTokens()

				const urlencoded = new URLSearchParams()
				urlencoded.append('refresh_token', refresh_token)
				urlencoded.append('grant_type', 'refresh_token')

				try {
					const { data } = await axios.post(LOGIN_URL, urlencoded)
					setTokens(data)
					prevRequest.headers['Authorization'] = `Bearer ${data.access_token}`
					return api(prevRequest)
				} catch (err) {
					logout()
					return Promise.reject(err)
				}
			}
			return Promise.reject(error)
		}
	)

	return api
}
