import Axios from 'axios'
import {
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
} from '../../constants/productConst'

const getProductDetails = (productId) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_DETAILS_REQUEST })

		const { data } = await Axios.get(
			`http://localhost:5000/api/products/${productId}`
		)

		dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload: error.response?.data?.message
				? error.response.data.message
				: error.message,
		})
	}
}

export default getProductDetails
