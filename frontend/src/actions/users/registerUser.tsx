import Axios from 'axios'
import {
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
} from '../../constants/userConstants'

const registerUser = (name, email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_REGISTER_REQUEST })
		const { user, token } = await (
			await Axios.post('http://localhost:5000/api/users/register', {
				name,
				email,
				password,
			})
		).data

		dispatch({ type: USER_REGISTER_SUCCESS, payload: user })
		localStorage.setItem('token', JSON.stringify(token))
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload: error.response?.data?.message
				? error.response.data.message
				: error.message,
		})
	}
}

export default registerUser
