import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux"
import {Link} from "react-router-dom"
import { createOrder } from '../action/orderAction'

export const PlaceOrderScreen = ({history}) => {
    const cart=useSelector((state)=>state.cart)

    const addDecimals=(num)=>{
        return(Math.round(num*100)/100).toFixed(2)
    }
    cart.itemsPrice=addDecimals(cart.cartItems.reduce((acc,item)=>acc+item.price*item.qty,0))
    cart.shippingPrice=addDecimals(cart.itemsPrice>100 ? 0 : 100)
    cart.taxPrice=addDecimals(Number(0.10*cart.itemsPrice).toFixed(2))
    cart.totalPrice=(Number(cart.itemsPrice)+Number(cart.shippingPrice)+Number(cart.taxPrice)).toFixed(2)

    const orderCreate=useSelector(s=>s.orderCreate)
    const {order,success,error}=orderCreate


    useEffect(()=>{
        if(success){
            history.push(`/order/${order._id}`)
        }
    },[history,success])

    const dispatch=useDispatch()

    const placeOrderHandler=()=>{
        dispatch(createOrder({
            orderItems:cart.cartItems,
            shippingAddress:cart.shippingAddress,
            paymentMethod:cart.paymentMethod,
            itemsPrice:cart.itemsPrice,
            shippingPrice:cart.shippingPrice,
            taxPrice:cart.taxPrice,
            totalPrice:cart.totalPrice
        }))
    }

  return (
    <div className='md:grid md:grid-cols-8 gap-2'>
        <div  className="divide-y divide-yellow-400 my-6 col-span-5">
            <div className="p-6">
                <h2 className='text-2xl text-yellow-500 mb-4'>Shipping</h2>
                <p>Address:<strong>{cart.shippingAddress.address},{cart.shippingAddress.city},{cart.shippingAddress.postalCode},{cart.shippingAddress.country}</strong></p>
            </div>
            <div className="p-6">
                <h2 className='text-2xl text-yellow-500 mb-4'>Payment Method</h2>
                <p>Method:<strong>{cart.paymentMethod}</strong></p>
            </div>
            <div className="p-6">
                <h2 className='text-2xl text-yellow-500 mb-4'>Order Items</h2>
                {cart.cartItems.length===0 ? <p>Your cart is empty</p> : 
                <div>
                    {cart.cartItems.map((item,index)=>(
                        <div kye={index} className='md:flex md:flex-row p-2 divide-y divide-yellow-400'>
                            <img src={`${process.env.REACT_APP_BACKEND_URL}/static`+item.image} alt={item.name} className='w-20 h-20 mr-4'></img>
                            <Link to={`/product/${item.product}`} className='md:grid md:grid-cols-3 gap-6'>
                                <div>{item.name}</div>
                                <div>{item.qty}×${item.price}=${item.qty*item.price}</div>
                            </Link>
                        </div>
                    ))}
                </div>
                }
            </div>
        </div>
        <div className="p-6 md:col-span-3">
            <h2 className='text-2xl text-yellow-500 mb-4'>Order Summary</h2>
            <div className='flex flex-col justify-between border-amber-900 border-2 p-4 divide-y divide-yellow-400'>
                <div className='flex flex-row justify-between '>
                    <p>Items</p>
                    <p>${cart.itemsPrice}</p>
                </div>
                <div className='flex flex-row justify-between '>
                    <p>Shipping</p>
                    <p>${cart.shippingPrice}</p>
                </div>
                <div className='flex flex-row justify-between '>
                    <p>Tax</p>
                    <p>${cart.taxPrice}</p>
                </div>
                <div className='flex flex-row justify-between '>
                    <p>Total</p>
                    <p>${cart.totalPrice}</p>
                </div>
                {error && <div>{error}</div>}
                <button disabled={cart.cartItems.length===0} onClick={placeOrderHandler} className='w-max mx-auto flex bg-yellow-500 hover:text-amber-900 mt-4'>PLACE ORDER</button>
            </div>
        </div>
    </div>
  )
}
