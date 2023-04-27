import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector } from "react-redux"
import {Link} from "react-router-dom"
import { getOrderDetails } from '../action/orderAction'

export const OrderScreen = (props) => {
    const orderId=props.match.params.id
    // console.log(orderId)
    const {loading,order,error}=useSelector((s)=>s.orderDetails)
    if(order){
        const addDecimals=(num)=>{
            return(Math.round(num*100)/100).toFixed(2)
        }
        order.itemsPrice=addDecimals(order.orderItems.reduce((acc,item)=>acc+item.price*item.qty,0))
    }
    console.log(order)
    const dispatch=useDispatch()
    useEffect(()=>{
        if(!order || order._id !== orderId) {
            dispatch(getOrderDetails(orderId))
        }
    },[dispatch, orderId])

  return(
    <>
    {loading ? <div>Loading...</div> 
    : error ? <div>{error} gjhffj</div> 
    : order && <div className="divide-y divide-yellow-400 my-6">
    <h1>Order <span>{orderId}</span></h1>
    <div className="p-6">
        <h2 className='text-2xl text-yellow-500 mb-4'>Shipping</h2>
        <p>Name:<strong>{order.user.name}</strong></p>
        <p>Email:<strong>{order.user.email}</strong></p>
        <p>Address:<strong>{order.shippingAddress.address},{order.shippingAddress.city},{order.shippingAddress.postalCode},{order.shippingAddress.country}</strong></p>
        <div>{order.isDeliverd ? <div className='text-yellow-600 bg-yellow-300 w-3/5 mt-4  p-3'>Deliverd on {order.isDeliverd}</div> : <div className='text-red-600 bg-red-300 w-3/5 mt-4 p-3'>Not deliverd</div>}</div>
    </div>
    <div className="p-6">
        <h2 className='text-2xl text-yellow-500 mb-4'>Payment Method</h2>
        <p>Method:<strong>{order.paymentMethod}</strong></p>
        <div>{order.isPaid ? <div className='text-yellow-600 bg-yellow-300 w-3/5 mt-4  p-3'>Paid on {order.paidAt}</div> : <div className='text-red-600 bg-red-300 w-3/5 mt-4 p-3'>Not paid</div>}</div>

    </div>
    <div className="p-6">
        <h2 className='text-2xl text-yellow-500 mb-4'>Order Items</h2>
        {order.orderItems.length===0 ? <p>Your order is empty</p> : 
        <div>
            {order.orderItems.map((item,index)=>(
                <div kye={index} className='md:flex md:flex-row p-2 divide-y divide-yellow-400'>
                    <img src={item.image} alt={item.name} className='w-20 h-20 mr-4'></img>
                    <Link to={`/product/${item.product}`} className='md:grid md:grid-cols-3 gap-6'>
                        <div>{item.name}</div>
                        <div>{item.qty}×${item.price}=${item.qty*item.price}</div>
                    </Link>
                </div>
            ))}
        </div>
        }
    </div>
    <div className="p-6">
        <h2 className='text-2xl text-yellow-500 mb-4'>Order Summary</h2>
        <div className='flex flex-col justify-between sm:w-3/5 md:w-2/5 border-amber-900 border-2 p-4 divide-y divide-yellow-400'>
            <div className='flex flex-row justify-between '>
                <p>Items</p>
                <p>${order.itemsPrice}</p>
            </div>
            <div className='flex flex-row justify-between '>
                <p>Shipping</p>
                <p>${order.shippingPrice}</p>
            </div>
            <div className='flex flex-row justify-between '>
                <p>Tax</p>
                <p>${order.taxPrice}</p>
            </div>
            <div className='flex flex-row justify-between '>
                <p>Total</p>
                <p>${order.totalPrice}</p>
            </div>
            {error && <div>{error}</div>}
        </div>
    </div>
</div>}</>
  )
}
