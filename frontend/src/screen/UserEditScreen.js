import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import {getUserDetails} from "../action/userAction"

export const UserEditScreen = ({match,history}) => {
    const userId=match.params.id
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [isAdmin,setAdmin]=useState(false)

    const dispatch=useDispatch()
    const {loading,error,user}=useSelector((state)=>state.userDetails)
    
    useEffect(()=>{
        if(user){

            if(user.name == null || user._id !== userId){
                dispatch(getUserDetails(userId))
            }else{
                setName(user.name)
                setEmail(user.email)
                setAdmin(user.isAdmin)
                // console.log(user.name)
            }
        }
    },[dispatch,user,userId])    

    const submitHandler=(e)=>{
        e.preventDefault()
     
    }
  return (
    <div className='flex flex-col items-center justify-center border border-yellow-900 mt-10 pb-4 pt-2 md:w-2/5 mx-auto'>
        <h1 className='text-3xl text-yellow-500'>Edit User</h1>
        {error && <div className='text-red-600 bg-red-300 w-full mt-4 text-center'>! {error}</div>}
        {loading && <div>Loading...</div>}
        <form className='flex flex-col mt-2 w-full p-4'>
        <label className='text-yellow-500'>Name</label>
            <input type="text" placeholder='Enter name' value={name} onChange={(e)=>setName(e.target.value)} className="border border-yellow-700 "></input>
            <label className='text-yellow-500'>Email Address</label>
            <input type="text" placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)} className="border border-yellow-700 "></input>
            <label className='flex'>
            <input type="checkbox"  checked={isAdmin} onChange={(e)=>setAdmin(e.target.checked)} className="border border-yellow-700"></input>
            <p className='ml-2 text-yellow-600'>Is Admin</p>
            </label>
            <button onClick={submitHandler} className="bg-yellow-500 text-yellow-800 px-4 py-2 hover:bg-yellow-300 my-4 mx-auto">UPDATE</button>
        </form>
        
    </div>
  )
}
