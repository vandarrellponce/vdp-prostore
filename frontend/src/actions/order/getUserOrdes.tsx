import Axios from 'axios'
import {
	ORDERS_BYUSER_FAIL,
	ORDERS_BYUSER_REQUEST,
	ORDERS_BYUSER_SUCCESS,
} from '../../constants/orderConstants'

const getUserOrders = () => async (dispatch) => {
	try {
		dispatch({ type: ORDERS_BYUSER_REQUEST })
		const token = JSON.parse(localStorage.getItem('token'))
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
		const userOrders = await (await Axios.get('/api/orders/myorders', config))
			.data
		dispatch({ type: ORDERS_BYUSER_SUCCESS, payload: userOrders })
	} catch (error) {
		dispatch({
			type: ORDERS_BYUSER_FAIL,
			payload: error.response?.data?.message
				? error.response.data.message
				: error.message,
		})
	}
}

export default getUserOrders
