import Axios from 'axios'
import {
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
} from '../../constants/productConst'

const getProductList = (keyword = '', pageNumber = '') => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST })

		const { data } = await Axios.get(
			`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
		)

		dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type: PRODUCT_LIST_FAIL,
			payload: error.response?.data?.message
				? error.response.data.message
				: error.message,
		})
	}
}

export default getProductList
