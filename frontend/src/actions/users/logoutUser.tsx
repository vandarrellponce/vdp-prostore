import Axios from 'axios'
import { USER_LOGOUT, USER_LOGOUT_FAIL } from '../../constants/userConstants'

export const logoutUser = () => async (dispatch, getState) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${JSON.parse(
					localStorage.getItem('token')
				)}`,
			},
		}
		localStorage.removeItem('userInfo')
		const res = await Axios.get(
			'http://localhost:5000/api/users/logout',
			config
		)
		dispatch({ type: USER_LOGOUT })
	} catch (error) {
		dispatch({
			type: USER_LOGOUT_FAIL,
			payload: error.response?.data?.message
				? error.response.data.message
				: error.message,
		})
	}
}

export default logoutUser
