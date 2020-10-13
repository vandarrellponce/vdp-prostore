import Axios from 'axios'
import {
	USER_LOGIN_SUCCESS,
	USER_UPDATE_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_RESET,
	USER_UPDATE_SUCCESS,
} from '../../constants/userConstants'

export const updateUser = (updatedUser) => async (dispatch) => {
	try {
		dispatch({ type: USER_UPDATE_REQUEST })
		const config = {
			headers: {
				Authorization: `Bearer ${JSON.parse(
					localStorage.getItem('token')
				)}`,
			},
		}
		const user = await (
			await Axios.put(
				`http://localhost:5000/api/users/profile`,
				updatedUser,
				config
			)
		).data

		dispatch({ type: USER_UPDATE_SUCCESS, payload: user })
	} catch (error) {
		dispatch({
			type: USER_UPDATE_FAIL,
			payload: error.response?.data?.message
				? error.response.data.message
				: error.message,
		})
	}
}

export default updateUser
