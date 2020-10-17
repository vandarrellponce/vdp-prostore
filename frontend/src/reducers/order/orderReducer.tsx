import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_GET_FAIL,
	ORDER_GET_REQUEST,
	ORDER_GET_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_RESET,
	ORDERS_BYUSER_REQUEST,
	ORDERS_BYUSER_SUCCESS,
	ORDERS_BYUSER_FAIL,
} from '../../constants/orderConstants'

const orderReducer = (
	state = {
		order: null,
		loading: false,
		payLoading: false,
		createError: null,
		getOrderError: null,
		orderPayError: null,
		userOrders: [],
		userOrdersLoading: null,
		userOrdersError: null,
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

		// PAY ORDER
		case ORDER_PAY_REQUEST: {
			return {
				...state,
				payLoading: true,
			}
		}
		case ORDER_PAY_SUCCESS: {
			return {
				...state,
				order: action.payload,
				payLoading: false,
			}
		}
		case ORDER_PAY_FAIL: {
			return {
				...state,
				payLoading: false,
				orderPayError: action.payload,
			}
		}
		case ORDER_PAY_RESET: {
			return {
				...state,
				order: null,
				payLoading: false,
				orderPayError: null,
			}
		}

		// GET ORDERS
		case ORDERS_BYUSER_REQUEST: {
			return {
				...state,
				userOrdersLoading: true,
				userOrdersError: null,
			}
		}
		case ORDERS_BYUSER_SUCCESS: {
			return {
				...state,
				userOrdersLoading: false,
				userOrders: action.payload,
				userOrdersError: null,
			}
		}
		case ORDERS_BYUSER_FAIL: {
			return {
				...state,
				userOrdersLoading: false,
				userOrdersError: action.payload,
			}
		}
		default:
			return state
	}
}

export default orderReducer
