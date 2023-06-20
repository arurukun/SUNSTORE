import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import {register} from "../action/userAction"

export const RegisterScreen = ({location,history}) => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const [message,setMessage]=useState(null)

    const dispatch=useDispatch()
    const {userInfo}=useSelector((state)=>state.userLogin)
    const {loading,error}=useSelector(s=>s.userRegister)
    
    const redirect=location.search ? location.search.split("=")[1] : "/"

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history,userInfo,redirect])

    const submitHandler=(e)=>{
        e.preventDefault()
        if(password !== confirmPassword){
// console.log(password)
// console.log(confirmPassword)
            setMessage("Passwords do not match")
        }else{
            dispatch(register(name,email,password))
        }
    }
  return (
    <div className='flex flex-col items-center justify-center border border-yellow-900 mt-10 pb-4 pt-2 md:w-2/5 mx-auto'>
        <h1 className='text-3xl text-yellow-500'>Sign Up</h1>
        {message && <div>{message}</div>}
        {error && <div className='text-red-600 bg-red-300 w-full mt-4 text-center'>! {error}</div>}
        {loading && <div>Loading...</div>}
        <form className='flex flex-col mt-2 w-full p-4'>
        <label className='text-yellow-500'>Name</label>
            <input type="text" placeholder='Enter name' onChange={(e)=>setName(e.target.value)} className="border border-yellow-700 "></input>
            <label className='text-yellow-500'>Email Address</label>
            <input type="text" placeholder='Enter email' onChange={(e)=>setEmail(e.target.value)} className="border border-yellow-700 "></input>
            <label className='text-yellow-500'>Password</label>
            <input type="password" placeholder='Enter password' onChange={(e)=>setPassword(e.target.value)} className="border border-yellow-700"></input>
            <label className='text-yellow-500'>Confirm Password</label>
            <input type="password" placeholder='Enter password' onChange={(e)=>setConfirmPassword(e.target.value)} className="border border-yellow-700"></input>
            <button onClick={submitHandler} className="bg-yellow-500 text-yellow-800 px-4 py-2 hover:bg-yellow-300 my-4 mx-auto">REGISTER</button>
        </form>
        <p className='text-yellow-500'>Have an Account?  
            <Link to={redirect ? `/login?redirect=${redirect}`:"/login"} className="hover:border-yellow-800 hover:border-b-2 text-yellow-700">Login</Link>
            {/* <a href={redirect ? `http://localhost:3000/login?redirect=${redirect}`:"/login"} className="hover:border-yellow-800 hover:border-b-2 text-yellow-700">Login</a> */}
        </p>
    </div>
  )
}
