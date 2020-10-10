import {
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
} from '../../constants/productConst'

const productDetailsReducer = (
	state = {
		product: {},
		loading: false,
		error: null,
	},
	action
) => {
	switch (action.type) {
		case PRODUCT_DETAILS_REQUEST: {
			return {
				...state,
				loading: true,
			}
		}
		case PRODUCT_DETAILS_SUCCESS: {
			return {
				...state,
				product: action.payload,
				loading: false,
			}
		}
		case PRODUCT_DETAILS_FAIL: {
			return {
				...state,
				loading: false,
				error: action.payload,
			}
		}
		default:
			return state
	}
}
export default productDetailsReducer
