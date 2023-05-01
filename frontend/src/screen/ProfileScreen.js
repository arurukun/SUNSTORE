import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import { getUserDetails,updateUserProfile } from '../action/userAction'
import { listMyOrder } from '../action/orderAction'

export const ProfileScreen = ({location,history}) => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const [message,setMessage]=useState(null)

    const dispatch=useDispatch()
    const {loading,error,user}=useSelector((s)=>s.userDetails)

    const {userInfo}=useSelector((s)=>s.userLogin)

    const {success}=useSelector((s)=>s.userUpdateProfile)

    const {loading:loadingOrders,error:erorrOrders,orders}=useSelector((s)=>s.orderListMy)
   
    useEffect(()=>{
      if(!userInfo){
        history.push("/login")
      }else{
        if(!user.name){
          dispatch(getUserDetails("profile"))
          dispatch(listMyOrder())
          // listMyOrder(dispatch)
        }else{
          setName(user.name)
          setEmail(user.email)
        }
      }
    },[dispatch,location,history,user])

    const submitHandler=async(e)=>{
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage("Passwords do not match!!")
        }else{
            dispatch(updateUserProfile({id:user._id,name,email,password}))
        }
    }
  return (
    <div className='md:grid md:grid-cols-3 gap-4 mt-6'>
        <div>
          <h1 className='text-3xl text-yellow-500'>User Profile</h1>
          {error && <div className='text-red-600 bg-red-300 w-full mt-4 text-center'>{error}</div>}
          {message && <div className='text-red-600 bg-yellow-300 w-full mt-4 text-center'>{message}</div>}
          {loading && <div>Loading...</div>}
          {success && <div className='text-yellow-600 bg-yellow-300 w-full mt-4 text-center'>Updated Profile</div>}
          <form className='flex flex-col mt-2 w-full p-4'>
              <label className='text-yellow-500'>Name</label>
              <input type="text" placeholder='Enter name' onChange={(e)=>setName(e.target.value)} className="border border-yellow-700 " value={name}></input>
              <label className='text-yellow-500'>Email Address</label>
              <input type="text" placeholder='Enter email' onChange={(e)=>setEmail(e.target.value)} className="border border-yellow-700 " value={email}></input>
              <label className='text-yellow-500'>Password</label>
              <input type="text" placeholder='Enter password' onChange={(e)=>setPassword(e.target.value)} className="border border-yellow-700"></input>
              <label className='text-yellow-500'>Confirm Password</label>
              <input type="text" placeholder='Enter password' onChange={(e)=>setConfirmPassword(e.target.value)} className="border border-yellow-700"></input>
              <button onClick={submitHandler} className="bg-yellow-400 px-4 py-2 hover:bg-yellow-200 my-4 mx-auto">UPDATE</button>
          </form>
        </div>
        <div>
          <h1 className='text-3xl text-yellow-500'>My Orders</h1>
          {loadingOrders ? <div>Loading...</div> : erorrOrders ? <div className='text-red-600'>{erorrOrders}</div> :
          <table className='table-auto border-2 border-slate-500 my-4'>
          <thead>
            <tr>
              <th className='border-2 border-slate-600 p-2'>ID</th>
              <th className='border-2 border-slate-600 p-2 px-8'>DATE</th>
              <th className='border-2 border-slate-600 p-2'>TOTAL</th>
              <th className='border-2 border-slate-600 p-2 px-8'>PAID</th>
              <th className='border-2 border-slate-600 p-2'>DELIVERED</th>
              <th className='border-2 border-slate-600 p-2 px-8'></th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.map((order)=>(
              <tr key={order._id}>
                <td className='border-2 border-slate-700 p-2'>{order._id.substring(18,)}</td>
                <td className='border-2 border-slate-700 p-2'>{order.createdAt.substring(0,10)}</td>
                <td className='border-2 border-slate-700 p-2'>{order.totalPrice}</td>
                <td className='border-2 border-slate-700 p-2'>{order.isPaid ? order.paidAt.substring(0,10) : <i className='fas fa-times' style={{color:"red"}}></i>}</td>
                <td className='border-2 border-slate-700 p-2'>{order.isDeliverd ? order.deliveredAt.substring(0,10) : <i className='fas fa-times' style={{color:"red"}}></i>}</td>
                <td className='border-2 border-slate-700 p-2 '><Link to={`/order/${order._id}`} className='bg-yellow-400 hover:bg-yellow-200 py-2 px-3 rounded-lg'>Details</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
          }         
        </div>
    </div>
  )
}


