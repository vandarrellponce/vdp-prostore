import Axios from 'axios'
import {
	ORDER_PAY_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_RESET,
	ORDER_PAY_SUCCESS,
} from '../../constants/orderConstants'

const payOrder = (orderId, paymentResult) => async (dispatch) => {
	try {
		dispatch({ type: ORDER_PAY_REQUEST })
		const token = JSON.parse(localStorage.getItem('token'))
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}

		const updatedOrder = await (
			await Axios.put(
				`http://localhost:5000/api/orders/${orderId}/pay`,
				paymentResult,
				config
			)
		).data
		dispatch({ type: ORDER_PAY_SUCCESS, payload: updatedOrder })
	} catch (error) {
		dispatch({
			type: ORDER_PAY_FAIL,
			payload: error.response?.data?.message
				? error.response.data.message
				: error.message,
		})
	}
}

export default payOrder
