import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import { getUserDetails } from '../action/userAction'
// import { register } from '../action/userAction'

export const ProfileScreen = ({location,history}) => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const [message,setMessage]=useState(null)

    const dispatch=useDispatch()
    const {loading,error,user}=useSelector((s)=>s.userDetails)

    const {userInfo}=useSelector((s)=>s.userLogin)
   
    useEffect(()=>{
      if(!userInfo){
        history.push("/login")
      }else{
        if(!user.name){
          // console.log("jhgf")
          dispatch(getUserDetails("profile"))
        }else{
          setName(user.name)
          setEmail(user.email)
        }
      }
    },[dispatch,location,history,user])

    const submitHandler=async(e)=>{
        e.preventDefault()
        if(password !== confirmPassword){
            console.log(password)
            console.log(confirmPassword)
            setMessage("Passwords do not match")
        }else{
            // dispatch(register(name,email,password))
        }
    }
  return (
    <div className='md:grid md:grid-cols-3 gap-4 mt-6'>
        <div>
          <h1 className='text-3xl text-yellow-500'>User Profile</h1>
          {message && <div>{message}</div>}
          {error && <div className='text-red-600 bg-red-300 w-full mt-4 text-center'>! {error}</div>}
          {loading && <div>Loading...</div>}
          <form className='flex flex-col mt-2 w-full p-4'>
              <label className='text-yellow-500'>Name</label>
              <input type="text" placeholder='Enter name' onChange={(e)=>setName(e.target.value)} className="border border-yellow-700 " value={name}></input>
              <label className='text-yellow-500'>Email Address</label>
              <input type="text" placeholder='Enter email' onChange={(e)=>setEmail(e.target.value)} className="border border-yellow-700 " value={email}></input>
              <label className='text-yellow-500'>Password</label>
              <input type="text" placeholder='Enter password' onChange={(e)=>setPassword(e.target.value)} className="border border-yellow-700"></input>
              <label className='text-yellow-500'>Confirm Password</label>
              <input type="text" placeholder='Enter password' onChange={(e)=>setConfirmPassword(e.target.value)} className="border border-yellow-700"></input>
              <button onClick={submitHandler} className="bg-yellow-500 text-yellow-800 px-4 py-2 hover:bg-yellow-300 my-4 mx-auto">UPDATE</button>
          </form>
        </div>
        <h1 className='text-3xl text-yellow-500'>My Orders</h1>
    </div>
  )
}


