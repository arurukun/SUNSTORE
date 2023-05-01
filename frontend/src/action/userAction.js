import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS } from "../constants/userConstants"
import axios from "axios"

export const login=(email,password)=>async(dispatch)=>{
    try{
        dispatch({type:USER_LOGIN_REQUEST})
        // const config={headers:{}}
        const config={headers:{"constent-type":"application/json"}}
        // console.log(email)
        const {data}=await axios.post("http://localhost:5000/api/user/login",{email,password},config)
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
        const {data}=await axios.post("http://localhost:5000/api/user",{name,email,password},config)
        // dispatch({type:USER_REGISTER_SUCCESS,payload:data})
        dispatch({type:USER_REGISTER_SUCCESS,payload:data})
        localStorage.setItem("userInfo",JSON.stringify(data))
    }catch(e){
        console.log(e.response.statusText)
        dispatch({type:USER_REGISTER_FAIL,payload:e.response ? e.response.statusText : e.message})
    }
}

export const getUserDetails=(id)=>async(dispatch,getState)=>{
    try{
        dispatch({type:USER_DETAILS_REQUEST})
        const {userLogin:{userInfo}}=getState()
        const config={headers:{"content-type":"application/json",Authorization:`Bearer ${userInfo.token}`}}
        const {data}=await axios.get(`http://localhost:5000/api/user/${id}`,config)
        dispatch({type:USER_DETAILS_SUCCESS,payload:data})
    }catch(e){
        dispatch({type:USER_DETAILS_FAIL,payload:e.response&&e.message ? e.response.message : e.message})
    }
}

export const updateUserProfile=(user)=>async(dispatch,getState)=>{
    try{
        dispatch({type:USER_UPDATE_PROFILE_REQUEST})
        const {userLogin:{userInfo}}=getState()
        const config={headers:{"content-type":"application/json",Authorization:`Bearer ${userInfo.token}`}}
        const {data}=await axios.put("http://localhost:5000/api/user/profile",user,config)
        dispatch({type:USER_UPDATE_PROFILE_SUCCESS,payload:data})
    }catch(e){
        dispatch({type:USER_UPDATE_PROFILE_FAIL,payload:e.response&&e.message ? e.response.message : e.message})
    }
}

export const listUsers=()=>async(dispatch,getState)=>{
    try{
        dispatch({type:"USER_LIST_REQUEST"})
        const {userLogin:{userInfo}}=getState()
        const config={headers:{Authorization:`Bearer ${userInfo.token}`}}
        console.log("data")

        const {data}=await axios.get("http://localhost:5000/api/user",config)
        console.log(data)
        dispatch({type:"USER_LIST_SUCCESS",payload:data})
    }catch(e){
        dispatch({type:"USER_LIST_FAIL",payload:e.response&&e.message ? e.response.message : e.message})
    }
}
