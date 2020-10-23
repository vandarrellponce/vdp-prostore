import Axios from 'axios'
import {
	USER_DETAILS_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_UPDATE_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
} from '../../constants/userConstants'

export const updateUser = (updatedUser) => async (dispatch) => {
	try {
		dispatch({ type: USER_UPDATE_REQUEST })
		const config = {
			headers: {
				Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
			},
		}
		const user = await (
			await Axios.put(`/api/users/profile`, updatedUser, config)
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

export const updateUserByAdmin = (updatedUser, id) => async (dispatch) => {
	try {
		dispatch({ type: USER_DETAILS_REQUEST })
		const config = {
			headers: {
				Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
			},
		}
		const user = await (
			await Axios.put(
				`http://localhost:5000/api/admin/users/${id}`,
				updatedUser,
				config
			)
		).data

		dispatch({ type: USER_DETAILS_SUCCESS, payload: user })
	} catch (error) {
		dispatch({
			type: USER_DETAILS_FAIL,
			payload: error.response?.data?.message
				? error.response.data.message
				: error.message,
		})
	}
}
