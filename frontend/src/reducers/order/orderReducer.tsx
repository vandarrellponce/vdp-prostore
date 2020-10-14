import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_GET_FAIL,
	ORDER_GET_REQUEST,
	ORDER_GET_SUCCESS,
} from '../../constants/orderConstants'

const orderReducer = (
	state = {
		order: null,
		loading: false,
		createError: null,
		getOrderError: null,
	},
	action
) => {
	switch (action.type) {
		// CREATE ORDER
		case ORDER_CREATE_REQUEST: {
			return {
				...state,
				loading: true,
			}
		}
		case ORDER_CREATE_SUCCESS: {
			return {
				...state,
				order: action.payload,
				loading: false,
				createError: null,
			}
		}
		case ORDER_CREATE_FAIL: {
			return {
				...state,
				loading: false,
				createError: action.payload,
			}
		}

		// GET ORDER DETAILS
		case ORDER_GET_REQUEST: {
			return {
				...state,
				loading: true,
			}
		}
		case ORDER_GET_SUCCESS: {
			return {
				...state,
				order: action.payload,
				loading: false,
			}
		}
		case ORDER_GET_FAIL: {
			return {
				...state,
				loading: false,
				getOrderError: action.payload,
			}
		}
		default:
			return state
	}
}

export default orderReducer
