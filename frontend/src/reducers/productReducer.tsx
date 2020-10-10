import {
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
} from '../constants/productConst'

const initState = {
	products: [1, 2, 3],
	loading: false,
	error: null,
}

interface Action {
	type: string
	payload: any
}

export const productListReducer = (state = initState, action: Action) => {
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
