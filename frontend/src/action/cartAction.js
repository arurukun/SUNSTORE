import axios from "axios"
import { CART_ADD_ITEM,CART_REMOVE_ITEM } from "../constants/cartConstants"

export const addToCart=(yu,qty)=>async(dispatch,getState)=>{
    const {data}=await axios.get(`http://localhost:5000/api/product/${yu}`)

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