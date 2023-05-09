import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listOrder } from '../action/orderAction'

export const OrderListScreen = ({history}) => {
    const {loading,orders,error}=useSelector((s)=>s.orderList)
    const {userInfo}=useSelector((s)=>s.userLogin)

    const dispatch=useDispatch()

    useEffect(()=>{
      if(userInfo && userInfo.isAdmin){
        dispatch(listOrder())
      }else{
        history.push("/login")
      }
    },[dispatch,history,userInfo])

    const deleteHandler=(id)=>{
      if(window.confirm("Are you sure")){
      }
    }
  return (
    <div>
        <h1 className='text-3xl text-yellow-500 mt-4'>Orders</h1>
        {loading ? <div>Loading...</div> : error ? <div className='text-red-600'>{error}</div> : 
    <table className='table-auto border-2 border-slate-500 my-4'>
    <thead>
      <tr>
        <th className='border-2 border-slate-600 p-2 px-8'>ID</th>
        <th className='border-2 border-slate-600 p-2 px-8'>USER</th>
        <th className='border-2 border-slate-600 p-2 px-8'>DATA</th>
        <th className='border-2 border-slate-600 p-2 px-8'>TOTAL</th>
        <th className='border-2 border-slate-600 p-2 px-8'>PAID</th>
        <th className='border-2 border-slate-600 p-2 px-8'>DELIVERD</th>
        <th className='border-2 border-slate-600 p-2 px-8'></th>
      </tr>
    </thead>
    <tbody>
      {orders && orders.map((order)=>(
        <tr key={order._id}>
          <td className='border-2 border-slate-700 p-2'>{order._id.substring(18,)}</td>
          <td className='border-2 border-slate-700 p-2'>{order.user ? order.user.name : "User Deleted"}</td>
          <td className='border-2 border-slate-700 p-2'>{order.createdAt.substring(0,10)}</td>
          <td className='border-2 border-slate-700 p-2'>{order.totalPrice}</td>
          <td className='border-2 border-slate-700 p-2'>{order.isPaid ? (order.paidAt.substring(0,10)) : (<i className='fas fa-times' style={{color:"red"}}></i>)}</td>
          <td className='border-2 border-slate-700 p-2'>{order.isDelivered ? (order.deliveredAt.substring(0,10)) : (<i className='fas fa-times' style={{color:"red"}}></i>)}</td>
          <td className='border-2 border-slate-700 p-2'>
            <Link to={`/order/${order._id}/edit`}><button className='bg-yellow-400 hover:bg-yellow-200 py-2 px-3 rounded-lg ml-2'>Details</button></Link>
            {/* <button onClick={()=>deleteHandler(order._id)} className='bg-yellow-400 hover:bg-yellow-200 py-2 px-3 rounded-lg ml-2'><i className='fas fa-trash'></i></button> */}
          </td>
        </tr>
      ))}
    </tbody>      
    </table>
    }</div>
  )
}
