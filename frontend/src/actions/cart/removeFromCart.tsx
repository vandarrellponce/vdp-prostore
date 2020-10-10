import Axios from 'axios'
import { CART_REMOVE_ITEM } from '../../constants/cartConstants'

const removeFromCart = (id) => async (dispatch, getState) => {
	try {
		// DISPATCH AND REMOVE FROM STORAGE
		dispatch({ type: CART_REMOVE_ITEM, payload: id })
		localStorage.setItem(
			'cartItems',
			JSON.stringify({ cartItems: getState().cart.cartItems })
		)
	} catch (error) {
		console.log(error)
	}
}

export default removeFromCart
