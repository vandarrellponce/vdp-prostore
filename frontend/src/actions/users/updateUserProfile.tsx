import Axios from 'axios'
import {
	USER_LOGIN_SUCCESS,
	USER_UPDATE_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_RESET,
	USER_UPDATE_SUCCESS,
} from '../../constants/userConstants'

export const updateUserProfile = (user) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_UPDATE_REQUEST })
		const config = {
			headers: {
				Authorization: `Bearer ${getState().user.userInfo.token}`,
			},
		}
		const res = await Axios.put(
			`http://localhost:5000/api/users/profile`,
			user,
			config
		)
		const newUserInfo = JSON.parse(localStorage.getItem('userInfo'))
		newUserInfo.name = res.data.name
		localStorage.setItem('userInfo', JSON.stringify(newUserInfo))

		dispatch({ type: USER_UPDATE_SUCCESS, payload: res.data })
	} catch (error) {
		dispatch({
			type: USER_UPDATE_FAIL,
			payload: error.response?.data?.message
				? error.response.data.message
				: error.message,
		})
	}
}

export default updateUserProfile
