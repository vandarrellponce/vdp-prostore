import Axios from 'axios'
import {
	USER_AUTH_FAIL,
	USER_AUTH_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
} from '../../constants/userConstants'

export const authUser = () => async (dispatch) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${JSON.parse(
					localStorage.getItem('token')
				)}`,
			},
		}
		const { data } = await Axios.get(
			'http://localhost:5000/api/users/profile',
			config
		)

		dispatch({ type: USER_AUTH_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type: USER_AUTH_FAIL,
			payload: error.response?.data?.message
				? error.response.data.message
				: error.message,
		})
	}
}

export const loginUser = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_LOGIN_REQUEST })

		const { user, token } = await (
			await Axios.post('http://localhost:5000/api/users/login', {
				email,
				password,
			})
		).data
		localStorage.setItem('token', JSON.stringify(token))
		dispatch({ type: USER_LOGIN_SUCCESS, payload: user })
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload: error.response?.data?.message
				? error.response.data.message
				: error.message,
		})
	}
}
