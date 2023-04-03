import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from "../constants/userConstants"
import axios from "axios"

export const login=(email,password)=>async(dispatch)=>{
    try{
        dispatch({type:USER_LOGIN_REQUEST})
        // const config={headers:{}}
        const config={headers:{"constent-type":"application/json"}}
        const {data}=await axios.get("http://localhost:5000/api/user/login",{email,password},config)
        // console.log(data+"hhhhhhhhhhh")
        dispatch({type:USER_LOGIN_SUCCESS,payload:data})
        localStorage.setItem("userInfo",JSON.stringify(data))
    }catch(e){
        console.log(e)
        dispatch({type:USER_LOGIN_FAIL,payload:e.response&&e.response.data ? e.response.data : e.message})
    }
}