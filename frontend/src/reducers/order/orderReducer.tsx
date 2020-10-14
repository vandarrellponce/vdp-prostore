import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
} from '../../constants/orderConstants'

const orderReducer = (
	state = {
		order: null,
		loading: false,
		createError: null,
	},
	action
) => {
	switch (action.type) {
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
		default:
			return state
	}
}

export default orderReducer
