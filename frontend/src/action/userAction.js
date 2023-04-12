import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants"
import axios from "axios"

export const login=(email,password)=>async(dispatch)=>{
    try{
        dispatch({type:USER_LOGIN_REQUEST})
        // const config={headers:{}}
        const config={headers:{"constent-type":"application/json"}}
        // console.log(email)
        const {data}=await axios.post("http://192.168.11.2:5000/api/user/login",{email,password},config)
        dispatch({type:USER_LOGIN_SUCCESS,payload:data})
        localStorage.setItem("userInfo",JSON.stringify(data))
    }catch(e){
        // console.log(e)
        dispatch({type:USER_LOGIN_FAIL,payload:e.response&&e.response.data ? e.response.data : e.message})
    }
}

export const logout=()=>(dispatch)=>{
    localStorage.removeItem("userInfo")
    dispatch({type:USER_LOGOUT})
}

export const register=(name,email,password)=>async(dispatch)=>{
    try{
        dispatch({type:USER_REGISTER_REQUEST})
        // const config={headers:{}}
        const config={headers:{"constent-type":"application/json"}}
        // console.log(email)
        const {data}=await axios.post("http://192.168.11.2:5000/api/user",{name,email,password},config)
        // dispatch({type:USER_REGISTER_SUCCESS,payload:data})
        dispatch({type:USER_LOGIN_SUCCESS,payload:data})
        localStorage.setItem("userInfo",JSON.stringify(data))
    }catch(e){
        console.log(e.response.statusText)
        dispatch({type:USER_REGISTER_FAIL,payload:e.response ? e.response.statusText : e.message})
    }
}

export const getUserDetails=(id)=>async(dispatch,getState)=>{
    // console.log(id)
    try{
        dispatch({type:USER_DETAILS_REQUEST})
        const {userLogin:{userInfo}}=getState()
        const config={headers:{"content-type":"application/json",Authorization:`Bearer ${userInfo.token}`}}
        // console.log("data")
        const {data}=await axios.get(`http://localhost:5000/api/user/${id}`,config)
        // console.log(data)
        dispatch({type:USER_DETAILS_SUCCESS,payload:data})
    }catch(e){
        dispatch({type:USER_DETAILS_FAIL,payload:e.response&&e.message ? e.response.message : e.message})
    }
}

// /api/user/654jjh75