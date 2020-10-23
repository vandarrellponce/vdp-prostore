import Axios from 'axios'
import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
} from '../../constants/orderConstants'
import { USER_REGISTER_FAIL } from '../../constants/userConstants'

const createOrder = (order) => async (dispatch) => {
	try {
		dispatch({ type: ORDER_CREATE_REQUEST })
		const token = JSON.parse(localStorage.getItem('token'))
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
		const { data } = await Axios.post('/api/orders', order, config)

		dispatch({ type: ORDER_CREATE_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload: error.response?.data?.message
				? error.response.data.message
				: error.message,
		})
	}
}

export default createOrder
