const resetCart = () => async (dispatch, getState) => {
	try {
		// DISPATCH AND REMOVE FROM STORAGE
		dispatch({ type: 'CART_RESET' })
		localStorage.setItem(
			'cartItems',
			JSON.stringify(getState().cart.cartItems)
		)
	} catch (error) {
		console.log(error)
	}
}

export default resetCart
