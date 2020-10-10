import {
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
} from '../../constants/productConst'

interface Action {
	type: string
	payload: any
}

const productListReducer = (
	state = {
		products: [],
		loading: false,
		error: null,
	},
	action: Action
) => {
	switch (action.type) {
		case PRODUCT_LIST_REQUEST: {
			return {
				...state,
				loading: true,
			}
		}
		case PRODUCT_LIST_SUCCESS: {
			return {
				...state,
				products: action.payload,
				loading: false,
			}
		}
		case PRODUCT_LIST_FAIL: {
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

export default productListReducer
