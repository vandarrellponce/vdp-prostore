import Axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../../constants/cartConstants'

const addToCart = (id, qty) => async (dispatch, getState) => {
	try {
		const product = (
			await Axios.get(`http://localhost:5000/api/products/${id}`)
		).data
		const item = {
			name: product.name,
			qty: qty,
			image: product.image,
			price: product.price,
			countInStock: product.countInStock,
			product: product._id,
		}
		// DISPATCH AND SAVE TO LOCAL STORAGE
		dispatch({ type: CART_ADD_ITEM, payload: item })
		localStorage.setItem(
			'cartItems',
			JSON.stringify(getState().cart.cartItems)
		)
	} catch (error) {
		console.log(error)
	}
}

export default addToCart
