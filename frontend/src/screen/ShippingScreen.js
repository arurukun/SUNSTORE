import React,{useState} from 'react'
import {useDispatch,useSelector} from "react-redux"
import { saveShippingAddress } from '../action/cartAction'

export const ShippingScreen = ({history}) => {
  const {shippingAddress}=useSelector(state=>state.cart)

  const [address,setAddress]=useState(shippingAddress.address)
  const [city,setCity]=useState(shippingAddress.city)
  const [postalCode,setPostalCode]=useState(shippingAddress.postalCode)
  const [country,setCountry]=useState(shippingAddress.country)

  const dispatch=useDispatch()
  const submitHandler=(e)=>{
    e.preventDefault()
    dispatch(saveShippingAddress({address,city,postalCode,country}))
    history.push("/payment")
  }
  return (
      <div className='md:grid md:grid-cols-3 gap-4 mt-6'>
          <h1 className='text-3xl text-yellow-500'>Shipping</h1>
          <form onSubmit={submitHandler} className='flex flex-col mt-2 w-full p-4'>
              <label className='text-yellow-500'>Address</label>
              <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} required placeholder='Enter address' className="border border-yellow-700 "></input>
              <label className='text-yellow-500'>City</label>
              <input type="text" value={city} onChange={(e)=>setCity(e.target.value)} required placeholder='Enter city' className="border border-yellow-700 "></input>
              <label className='text-yellow-500'>PostalCode</label>
              <input type="text" value={postalCode} onChange={(e)=>setPostalCode(e.target.value)} required placeholder='Enter postal code' className="border border-yellow-700 "></input>
              <label className='text-yellow-500'>Country</label>
              <input type="text" value={country} onChange={(e)=>setCountry(e.target.value)} required placeholder='Enter country' className="border border-yellow-700 "></input>
              <button type="submit" className="bg-yellow-500 text-yellow-800 px-4 py-2 hover:bg-yellow-300 my-4 mx-auto">CONTINUE</button>
          </form>
      </div>
  )
}
