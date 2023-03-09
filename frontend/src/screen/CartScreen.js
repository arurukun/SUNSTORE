import React ,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {addToCart} from "../action/cartAction"

export const CartScreen = ({match,location,history}) => {
  const productId=match.params.yu
  const qty=location.search ? Number(location.search.split('=')[1]):1
  const dispatch=useDispatch()

  const cart=useSelector(state=>state.cart)
  const {cartItems} =cart
  console.log(cartItems+" cartItems")

  useEffect(()=>{
    if(productId){
      console.log(qty)
      dispatch(addToCart(productId,qty))
    }
  },[dispatch,productId,qty])

  console.log("hi")
  return (
    <>
      <div className='text-2xl'>Shopping Cart</div>
      <div>{cartItems.lenght === 0 ? <p>Shopping Cart is empty <Link to="/"> Go Back</Link></p> : "i"}</div>
    </>
  )
}
