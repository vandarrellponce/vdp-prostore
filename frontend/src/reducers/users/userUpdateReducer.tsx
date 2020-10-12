import {
	USER_UPDATE_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_RESET,
	USER_UPDATE_SUCCESS,
} from '../../constants/userConstants'

const userUpdateReducer = (
	state = {
		userInfo: null,
		loading: false,
		error: null,
		success: false,
	},
	action
) => {
	switch (action.type) {
		case USER_UPDATE_REQUEST: {
			return {
				...state,
				loading: true,
			}
		}
		case USER_UPDATE_SUCCESS: {
			return {
				...state,
				loading: false,
				userInfo: action.payload,
				success: true,
			}
		}
		case USER_UPDATE_FAIL: {
			return {
				...state,
				loading: false,
				error: action.payload,
				success: false,
			}
		}
		case USER_UPDATE_RESET: {
			return {
				userInfo: null,
				loading: false,
				error: null,
				success: false,
			}
		}

		default:
			return state
	}
}

export default userUpdateReducer
