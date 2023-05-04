import {createStore,combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import  {composeWithDevTools} from "redux-devtools-extension"
import { cartReducer } from "./reducer/cartReducer"

import { productCreateReducer, productDeleteReducer, productDetailsReducer, productListReducer } from "./reducer/productReducer"
import { userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer, userUpdateReducer } from "./reducer/userReducer"
import { orderCreateReducer, orderDetailsReducer, orderListMyReducer, orderPayReducer } from "./reducer/orderReducer"

// const reducer=combineReducers({})
const reducer=combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,
    // userList:userListR, userListA, USER_LIST_LOD, USER_LIST_SUC, USER_LIST_ERR
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderListMy:orderListMyReducer,
})

const cartItemsFromStorage=localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItem")) : []
// const cartItemsFromStorage = JSON.parse(localStorage.getItem("cartItem")) ?? [];
// let cartItemsFromStorage=[]

const userInfoFromStorage=localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null


const shippingAddressFromStorage=localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {}
const paymentMethodFromStorage="Paypal"

const initialState={
    cart:{shippingAddress:shippingAddressFromStorage,paymentMethod:paymentMethodFromStorage,cartItems:cartItemsFromStorage},
    userLogin:{userInfo:userInfoFromStorage},
}

const middleware=[thunk]
const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store