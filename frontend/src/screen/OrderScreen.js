import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector } from "react-redux"
import {Link} from "react-router-dom"
import { getOrderDetails,payOrder ,delivereOrder} from '../action/orderAction'
import axios from 'axios'
import {PayPalButton} from "react-paypal-button-v2"

export const OrderScreen = (props) => {
    const orderId=props.match.params.id
    const {loading,order,error}=useSelector((s)=>s.orderDetails)

    const [sdkReady,setSdkReady]=useState(false)
    const orderPay=useSelector((s)=>s.orderPay)
    const {loading:loadingPay,success:successPay}=orderPay

    const {loading:loadingDelivere,success:successDelivere}=useSelector((s)=>s.orderDelivere)
    const {userInfo}=useSelector((s)=>s.userLogin)

    if(order){
        const addDecimals=(num)=>{
            return(Math.round(num*100)/100).toFixed(2)
        }
        order.itemsPrice=addDecimals(order.orderItems.reduce((acc,item)=>acc+item.price*item.qty,0))
    }
    // console.log(order)
    const dispatch=useDispatch()
    useEffect(()=>{
        const addPayPalScript=async()=>{
            const {data:clientId}=await axios.get("http://localhost:5000/api/config/paypal")
            const script=document.createElement("script")
            script.type="text/javescript"
            script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async=true
            script.onload=()=>{setSdkReady(true)}
            document.body.appendChild(script)
            // console.log(sdkReady)
        }
        // addPayPalScript()
        if(!order || successPay || successDelivere) {
        // if(!order || order._id !== orderId) {
            dispatch({type:"ORDER_PAY_RESET"})
            dispatch({type:"ORDER_DELIVERE_RESET"})
            dispatch(getOrderDetails(orderId))
        }else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript()
            }
        }
    },[dispatch, orderId,successPay,successDelivere,order])

    const successPaymentHandler=(paymentResult)=>{
        console.log(paymentResult)
        dispatch(payOrder(orderId,paymentResult))
    }

    const delivereHandler=()=>{
        dispatch(delivereOrder(order))
    }

  return(
    <>
    {loading ? <div>Loading...</div> 
    : error ? <div>{error}</div> 
    : order && <div className="divide-y divide-yellow-400 my-6">
    <h1 className="text-4xl m-6 text-yellow-500">Order <span className='text-xl text-yellow-500'>-{orderId}-</span></h1>
    <div className='md:grid md:grid-cols-8 gap-2'>
        <div className='md:col-span-5'>
            <div className="p-6">
                <h2 className='text-2xl text-yellow-500 mb-4'>Shipping</h2>
                <p>Name:<strong>{order.user.name}</strong></p>
                <p>Email:<strong>{order.user.email}</strong></p>
                <p>Address:<strong>{order.shippingAddress.address},{order.shippingAddress.city},{order.shippingAddress.postalCode},{order.shippingAddress.country}</strong></p>
                <div>{order.isDelivered ? <div className='text-yellow-600 bg-yellow-300 mt-4  p-3'>Deliverd on {order.isDeliverd}</div> : <div className='text-red-600 bg-red-300 mt-4 p-3'>Not deliverd</div>}</div>
            </div>
            <div className="p-6">
                <h2 className='text-2xl text-yellow-500 mb-4'>Payment Method</h2>
                <p>Method:<strong>{order.paymentMethod}</strong></p>
                <div>{order.isPaid ? <div className='text-yellow-600 bg-yellow-300 mt-4  p-3'>Paid on {order.paidAt}</div> : <div className='text-red-600 bg-red-300 mt-4 p-3'>Not paid</div>}</div>

            </div>
            <div className="p-6">
                <h2 className='text-2xl text-yellow-500 mb-4'>Order Items</h2>
                {order.orderItems.length===0 ? <p>Your order is empty</p> : 
                <div>
                    {order.orderItems.map((item,index)=>(
                        <div kye={index} className='md:flex md:flex-row p-2 divide-y divide-yellow-400'>
                            <img src={'http://localhost:5000/static'+item.image} alt={item.name} className='w-20 h-20 mr-4'></img>
                            <Link to={`/product/${item.product}`} className='md:grid md:grid-cols-3 gap-6'>
                                <div>{item.name}</div>
                                <div>{item.qty}×${item.price}=${item.qty*item.price}</div>
                            </Link>
                        </div>
                    ))}
                </div>
                }
            </div>
            <div className=''>
                <h2 className='text-xl'>This id and password is for test purpose only!</h2>
                <span className='font-bold'>ID : </span> 
                <span className=''>proshoptest1@personal.example.com</span>
                <div />
                <span className='font-bold'>Password : </span>  
                <span className=''>proshoptest1</span>
            </div>
        </div> 
        <div className="p-6 md:col-span-3">
            <h2 className='text-2xl text-yellow-500 mb-4'>Order Summary</h2>
            <div className='flex flex-col justify-between border-amber-900 border-2 p-4 divide-y divide-yellow-400'>
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
                {!order.isPaid &&
                    <div>
                        {loadingPay && <div>Loading.............</div>}
                        {sdkReady ? <div>Loading...</div> : <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}></PayPalButton>}
                    </div>
                }
                {userInfo && order.isPaid && ! order.isDelivered && (
                    <div>
                        <button onClick={delivereHandler} className='bg-yellow-500 text-yellow-800 px-4 py-2 hover:bg-yellow-300 my-4 mx-auto'>Mark As Delivered</button>
                    </div>
                )}
            </div>
        </div>
    </div>
</div>}</>
  )
}
