import {
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
} from '../../constants/userConstants'

const userReducer = (
	state = {
		userInfo: null,
		loading: false,
		error: null,
	},
	action
) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST: {
			return {
				...state,
				loading: true,
			}
		}
		case USER_LOGIN_SUCCESS: {
			return {
				...state,
				loading: false,
				userInfo: action.payload,
			}
		}
		case USER_LOGIN_FAIL: {
			return {
				...state,
				loading: false,
				error: action.payload,
			}
		}
		case USER_LOGOUT: {
			return {}
		}
		default:
			return state
	}
}

export default userReducer
