import { useNavigate } from 'react-router-dom'

export const useStorage = () => {
	const navigate = useNavigate()

	const getTokens = () => {
		const tokens = localStorage.getItem('tokens')
		if (!tokens) return { access: '', refresh: '' }
		const { access_token, refresh_token } = JSON.parse(tokens)
		return { access_token, refresh_token }
	}

	const setTokens = (data: any) => {
		localStorage.setItem(
			'tokens',
			JSON.stringify({
				access_token: data.access_token,
				refresh_token: data.refresh_token
			})
		)
	}

	const removeTokens = () => {
		localStorage.removeItem('tokens')
	}

	const logout = () => {
		removeTokens()
		removeUserData()
		navigate('/')
	}

	const login = (data: any) => {
		setTokens(data)
		setUserData(data)
		navigate('/dashboard', { replace: true })
	}

	const setUserData = (data: any) => {
		localStorage.setItem(
			'user',
			JSON.stringify({
				personId: data.personId,
				userId: data.userId,
				roleName: data.roleName,
				userLogin: data.userLogin,
				network: data.network
			})
		)
	}

	const getUsername = () => {
		const user = localStorage.getItem('user')
		if (!user) return null
		return JSON.parse(user).userLogin
	}

	const getUserData = () => {
		const user = localStorage.getItem('user')
		if (!user) return null
		return JSON.parse(user)
	}

	const removeUserData = () => {
		localStorage.removeItem('user')
	}

	return { getTokens, setTokens, removeTokens, logout, setUserData, getUserData, removeUserData, login, getUsername }
}
