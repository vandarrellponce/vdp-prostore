import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import productListReducer from '../reducers/products/productListReducer'
import productDetailsReducer from '../reducers/products/productDetailsReducer'
import cartReducer from '../reducers/cart/cartReducer'
import userReducer from '../reducers/users/userReducer'

// RETREIVING ITEMS FROM STORAGE
const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: []

// INITIAL STATE
const initialState = {
	cart: {
		cartItems: cartItemsFromStorage,
	},
}
// ROOT REDUCER
const rootReducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	user: userReducer,
})
// STORE
const middleware = [thunk]
const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
