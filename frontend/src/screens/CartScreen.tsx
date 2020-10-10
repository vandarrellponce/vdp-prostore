import React from 'react'

const CartScreen = (props) => {
	console.log(props)
	return <div>{props.match.params.id}</div>
}

export default CartScreen
