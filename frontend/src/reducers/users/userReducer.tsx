import {
	USER_AUTH_FAIL,
	USER_AUTH_SUCCESS,
	USER_LIST_FAIL,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_LOGOUT_FAIL,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_UPDATE_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_RESET,
	USER_UPDATE_SUCCESS,
	USER_DELETE_SUCCESS,
	USER_DELETE_REQUEST,
	USER_DELETE_FAIL,
} from '../../constants/userConstants'

const userReducer = (
	state = {
		userInfo: null,
		loading: false,
		error: null,
		authError: null,
		loginError: null,
		registerError: null,
		updateError: null,
		userList: [],
		userListLoading: null,
		userListError: null,
		userDeleteResponse: null,
		userDeleteLoading: false,
		userDeleteError: null,
	},
	action
) => {
	switch (action.type) {
		// USER DELETE
		case USER_DELETE_REQUEST: {
			return {
				...state,
				userDeleteLoading: true,
			}
		}
		case USER_DELETE_SUCCESS: {
			return {
				...state,
				userDeleteLoading: false,
				userDeleteResponse: action.payload,
			}
		}
		case USER_DELETE_FAIL: {
			return {
				...state,
				userDeleteLoading: false,
				userDeleteError: action.payload,
			}
		}

		// USER LIST
		case USER_LIST_REQUEST: {
			return {
				...state,
				userListLoading: true,
			}
		}
		case USER_LIST_SUCCESS: {
			return {
				...state,
				userListLoading: false,
				userList: action.payload,
			}
		}
		case USER_LIST_FAIL: {
			return {
				...state,
				userListLoading: false,
				userListError: action.payload,
			}
		}

		// USER_AUTH
		case USER_AUTH_SUCCESS: {
			return {
				...state,
				userInfo: action.payload,
				error: null,
			}
		}
		case USER_AUTH_FAIL: {
			return {
				...state,
				authError: action.payload,
			}
		}
		// USER LOGIN
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
				loginError: action.payload,
			}
		}
		// USER LOGOUT
		case USER_LOGOUT: {
			return {}
		}
		case USER_LOGOUT_FAIL: {
			return {
				...state,
				loading: false,
				error: action.payload,
			}
		}
		// USER REGISTER
		case USER_REGISTER_REQUEST: {
			return {
				...state,
				loading: true,
			}
		}
		case USER_REGISTER_SUCCESS: {
			return {
				...state,
				userInfo: action.payload,
				loading: false,
			}
		}
		case USER_REGISTER_FAIL: {
			return {
				...state,
				loading: false,
				registerError: action.payload,
			}
		}
		// USER UPDATE
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
			}
		}
		case USER_UPDATE_FAIL: {
			return {
				...state,
				loading: false,
				updateError: action.payload,
			}
		}
		case USER_UPDATE_RESET: {
			return {
				userInfo: null,
				loading: false,
				error: null,
			}
		}
		default:
			return state
	}
}

export default userReducer
