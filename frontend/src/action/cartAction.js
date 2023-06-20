import axios from "axios"
import { CART_ADD_ITEM,CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING } from "../constants/cartConstants"

export const addToCart=(yu,qty)=>async(dispatch,getState)=>{
    // const {data}=await axios.get(`http://localhost:5000/api/product/${yu}`)
    // const {data}=await axios.get(`http://35.78.136.85:5000/api/product/${yu}`)
    const {data}=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/product/${yu}`)
    // const {data}=await axios.get(`http://localhost:5000/api/product/${yu}`)

    dispatch({
        type:CART_ADD_ITEM,
        payload:{
            product:data._id,
            name:data.name,
            image:data.image,
            price:data.price,
            countInStock:data.countInStock,
            qty
        }
    })

    localStorage.setItem("cartItem",JSON.stringify(getState().cart.cartItems))
// console.log(localStorage.setItem("cartItem",JSON.stringify(getState().cart.cartItems))+"local")
}

export const removeFromCart=(yu)=>(dispatch,getState)=>{
    dispatch({
        type:CART_REMOVE_ITEM,
        payload:yu,
    })
    localStorage.setItem("cartItem",JSON.stringify(getState.cart.cartItems))
}

export const saveShippingAddress=(data)=>(dispatch)=>{
    dispatch({type:CART_SAVE_SHIPPING,payload:data})
    localStorage.setItem("shippingAddress",JSON.stringify(data))
}

export const savePaymentMethot=(data)=>(dispatch)=>{
    dispatch({type:CART_SAVE_PAYMENT_METHOD,payload:data})
    localStorage.setItem("paymentMethod",JSON.stringify(data))
}