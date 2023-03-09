import {createStore,combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import  {composeWithDevTools} from "redux-devtools-extension"
import { cartReducer } from "./reducer/cartReducer"

import { productDetailsReducer, productListReducer } from "./reducer/productReducer"

// const reducer=combineReducers({})
const reducer=combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer,
})

const cartItemsFromStorage=localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItem")) : []
// const cartItemsFromStorage = JSON.parse(localStorage.getItem("cartItem")) ?? [];
// let cartItemsFromStorage=[]


const initialState={
    cart:{cartItems:cartItemsFromStorage},
}

const middleware=[thunk]
const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store