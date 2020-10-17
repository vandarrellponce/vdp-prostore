import Axios from 'axios'
import {
	USER_DELETE_FAIL,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
} from '../../constants/userConstants'

const deleteUser = (id) => async (dispatch) => {
	try {
		dispatch({ type: USER_DELETE_REQUEST })
		const token = JSON.parse(localStorage.getItem('token'))
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
		const message = await (
			await Axios.delete(`http://localhost:5000/api/users/${id}`, config)
		).data
		dispatch({ type: USER_DELETE_SUCCESS, payload: message })
	} catch (error) {
		dispatch({
			type: USER_DELETE_FAIL,
			payload: error.response?.data?.message
				? error.response.data.message
				: error.message,
		})
	}
}

export default deleteUser
