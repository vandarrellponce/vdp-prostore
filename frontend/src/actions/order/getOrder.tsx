import Axios from 'axios'
import {
	ORDER_GET_FAIL,
	ORDER_GET_REQUEST,
	ORDER_GET_SUCCESS,
} from '../../constants/orderConstants'

const getOrder = (id) => async (dispatch) => {
	try {
		dispatch({ type: ORDER_GET_REQUEST })
		const token = JSON.parse(localStorage.getItem('token'))
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
		const order = await (
			await Axios.get(`http://localhost:5000/api/orders/${id}`, config)
		).data
		dispatch({ type: ORDER_GET_SUCCESS, payload: order })
	} catch (error) {
		console.log(error)
		dispatch({
			type: ORDER_GET_FAIL,
			payload: error.response?.data?.message
				? error.response.data.message
				: error.message,
		})
	}
}

export default getOrder
