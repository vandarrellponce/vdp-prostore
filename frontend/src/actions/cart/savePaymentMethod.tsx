import { CART_SAVE_PAYMENT_METHOD } from '../../constants/cartConstants'

const savePaymentMethod = (method) => async (dispatch) => {
	dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: method })
}

export default savePaymentMethod
