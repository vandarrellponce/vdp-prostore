import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../../constants/cartConstants'

const cartReducer = (state = { cartItems: [] }, action) => {
	switch (action.type) {
		case CART_ADD_ITEM: {
			const newItem = action.payload

			// if newItem is already in the cartItems, then replace the old item with the new one
			// product in here is the product id
			const itemExists = state.cartItems.find(
				(currentItem) => currentItem.product === newItem.product
			)
			if (itemExists) {
				return {
					...state,
					cartItems: state.cartItems.map((currentItem) =>
						currentItem.product === newItem.product
							? newItem
							: currentItem
					),
				}
			}

			return {
				...state,
				cartItems: [...state.cartItems, newItem],
			}
		}
		case CART_REMOVE_ITEM: {
			return {
				...state,
				cartItems: state.cartItems.filter(
					(item) => item._id !== action.payload
				),
			}
		}

		default:
			return state
	}
}

export default cartReducer
