import Axios from 'axios'
import {
	USER_LIST_FAIL,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
} from '../../constants/userConstants'

const getUserList = () => async (dispatch) => {
	try {
		dispatch({ type: USER_LIST_REQUEST })
		const token = JSON.parse(localStorage.getItem('token'))
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
		const userList = await (
			await Axios.get('http://localhost:5000/api/users', config)
		).data
		dispatch({ type: USER_LIST_SUCCESS, payload: userList })
	} catch (error) {
		dispatch({
			type: USER_LIST_FAIL,
			payload: error.response?.data?.message
				? error.response.data.message
				: error.message,
		})
	}
}

export default getUserList
