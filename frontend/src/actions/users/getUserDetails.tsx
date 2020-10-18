import Axios from 'axios'
import {
	USER_DETAILS_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
} from '../../constants/userConstants'

export const getUserDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: USER_DETAILS_REQUEST })
		const config = {
			headers: {
				Authorization: `Bearer ${JSON.parse(
					localStorage.getItem('token')
				)}`,
			},
		}
		const res = await Axios.get(
			`http://localhost:5000/api/admin/users/${id}`,
			config
		)
		dispatch({ type: USER_DETAILS_SUCCESS, payload: res.data })
	} catch (error) {
		dispatch({
			type: USER_DETAILS_FAIL,
			payload: error.response?.data?.message
				? error.response.data.message
				: error.message,
		})
	}
}

export default getUserDetails
