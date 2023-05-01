import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { listUsers } from '../action/userAction'
import { Link } from 'react-router-dom'

export const UserListScreen = () => {
    const {loading,users,error}=useSelector((s)=>s.userList)

    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(listUsers())
    },[dispatch])

    const deleteHandler=(id)=>{}
  return (
    <div>
        <h1 className='text-3xl text-yellow-500'>Users</h1>
        {loading ? <div>Loading...</div> : error ? <div className='text-red-600'>{error}</div> : 
    <table className='table-auto border-2 border-slate-500 my-4'>
    <thead>
      <tr>
        {/* <th className='border-2 border-slate-600 p-2'>ID</th> */}
        <th className='border-2 border-slate-600 p-2 px-8'>NAME</th>
        <th className='border-2 border-slate-600 p-2'>EMAIL</th>
        <th className='border-2 border-slate-600 p-2 px-8'>ADMIN</th>
        <th className='border-2 border-slate-600 p-2 px-8'></th>
      </tr>
    </thead>
    <tbody>
      {users && users.map((user)=>(
        <tr key={user._id}>
          {/* <td className='border-2 border-slate-700 p-2'>{users._id.substring(18,)}</td> */}
          <td className='border-2 border-slate-700 p-2'>{user.name}</td>
          <td className='border-2 border-slate-700 p-2'><a href={`mailto:${user.email}`}>{user.email}</a></td>
          <td className='border-2 border-slate-700 p-2'>{user.isAdmin ? (<i className='fas fa-check' style={{color:"green"}}></i>) : (<i className='fas fa-times' style={{color:"red"}}></i>)}</td>
          <td className='border-2 border-slate-700 p-2'>
            <Link to={`/user/${user._id}/edit`} className='bg-yellow-400 hover:bg-yellow-200 py-2 px-3 rounded-lg'><i className='fas fa-edit'></i></Link>
            <button onClick={()=>deleteHandler(user._id)} className='bg-yellow-400 hover:bg-yellow-200 py-2 px-3 rounded-lg ml-2'><i className='fas fa-trash'></i></button>
          </td>
        </tr>
      ))}
    </tbody>      
    </table>
    }</div>
  )
}
