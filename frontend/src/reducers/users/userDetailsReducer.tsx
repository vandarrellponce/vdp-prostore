import {
	USER_DETAILS_SUCCESS,
	USER_DETAILS_REQUEST,
	USER_DETAILS_FAIL,
} from '../../constants/userConstants'

const userDetailsReducer = (
	state = {
		userInfo: null,
		loading: false,
		error: null,
	},
	action
) => {
	switch (action.type) {
		case USER_DETAILS_REQUEST: {
			return {
				...state,
				loading: true,
			}
		}
		case USER_DETAILS_SUCCESS: {
			return {
				...state,
				loading: false,
				userInfo: action.payload,
			}
		}
		case USER_DETAILS_FAIL: {
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

export default userDetailsReducer
