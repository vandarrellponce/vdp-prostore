import Axios from 'axios'
import {
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
} from '../../constants/userConstants'

export const loginUser = (email, password) => async (dispatch) => {
	try {
		dispatch(USER_LOGIN_REQUEST)

		const { user, token } = await (
			await Axios.post('http://localhost:5000/api/users/login', {
				email,
				password,
			})
		).data
		const userInfo = {
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: token,
		}
		dispatch({ type: USER_LOGIN_SUCCESS, payload: userInfo })
		localStorage.setItem('userInfo', JSON.stringify(userInfo))
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload: error.response?.data?.message
				? error.response.data.message
				: error.message,
		})
	}
}
