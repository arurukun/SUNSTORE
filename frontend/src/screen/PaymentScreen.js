import React,{useState} from 'react'
import {useDispatch,useSelector} from "react-redux"
import { savePaymentMethot } from '../action/cartAction'

export const PaymentScreen = ({history}) => {
// console.log("hi")
  const {shippingAddress}=useSelector(state=>state.cart)

  if(!shippingAddress){
    history.push("/shipping")
  }

  const [paymentMethod,setPaymentMethod]=useState("Paypal")

  const dispatch=useDispatch()
  const submitHandler=(e)=>{
    e.preventDefault()
    dispatch(savePaymentMethot(paymentMethod))
    history.push("/placeorder")
  }
  return (
      <div className='md:grid md:grid-cols-3 gap-4 mt-6'>
          <h1 className='text-3xl text-yellow-500'>Payment Method</h1>
          <form onSubmit={submitHandler} className='flex flex-col mt-2 w-full p-4'>
            <label>
              <input type="radio" name="paymentMethod" value="Paypal" checked onChange={(e)=>setPaymentMethod(e.target.value)}/>Paypal
            </label>
            <label>
                <input type="radio" name="paymentMethod" value="Stripe" onChange={(e)=>setPaymentMethod(e.target.value)}/>Stripe
            </label>
            <button type="submit" className="bg-yellow-500 text-yellow-800 px-4 py-2 hover:bg-yellow-300 my-4 mx-auto">CONTINUE</button>
          </form>
      </div>
  )
}
