import React ,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {addToCart, removeFromCart} from "../action/cartAction"

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

  const removeFromCartHandler=(yu)=>{
    console.log(yu)
    dispatch(removeFromCart(yu))
  }
  console.log([...Array(7).keys()])

  const checkoutHandler=()=>{
    history.push("/login?redirect=shipping")
  }

  return (
    <>
      <div className='text-4xl m-6 text-yellow-500'>Shopping Cart</div>
      <div>{cartItems.length === 0 ? 
      <div className='text-xl '>Shopping Cart is empty <Link to="/" className="underline hover:decoration-yellow-500"> Go Back</Link></div> 
      : 
      <div>{cartItems.map(item=>(
      <div key={item.product} className="md:flex md:flex-row mb-6 divide-y-2">
        <div className='md:grid md:grid-cols-5 '>
          <img src={item.image} className="md:w-40 h-32"></img>
          <div className='text-xl'>{item.name}</div>
          <div>${item.price}</div>
          <select value={item.qty} onChange={(e)=>dispatch(addToCart(item.product,Number(e.target.value)))} className="md:w-3/5 md:h-1/4 border border-black ">
            {[...Array(item.countInStock).keys()].map((x)=>{
              return <option key={x+1} value={x+1}>{x+1}</option>
            })}
          </select>
          <button onClick={()=>removeFromCartHandler(item.product)}>
            <i className='fas fa-trash'></i>
          </button>
        </div>
      </div>
      ))}
        <div className='mt-10 w-max p-4 mx-auto border-amber-900 border-2 '> 
          <p className='text-2xl text-yellow-600'>SUBTOTAL <span className='text-amber-900'>( {cartItems.reduce((acc,item)=>acc+item.qty,0)} )</span> ITEMS</p>
          <p className='text-2xl text-yellow-600 text-center'>PRICE: <span className='text-amber-900'>${cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)}</span></p>
          <button onClick={checkoutHandler} disabled={cartItems.lenght===0} className="w-max mx-auto flex bg-yellow-500 hover:text-amber-900 mt-4">Proceed to checkout</button>
        </div>
      </div>
      }</div>
      </>
  )
}
