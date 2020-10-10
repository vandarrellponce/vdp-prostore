import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import productListReducer from '../reducers/products/productListReducer'
import productDetailsReducer from '../reducers/products/productDetailsReducer'

const initialState = {}
const rootReducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
})

const middleware = [thunk]

const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
