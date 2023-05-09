import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from "../constants/orderConstants"
import axios from "axios"

export const createOrder=(order)=>async(dispatch,getState)=>{
    try{
        dispatch({type:ORDER_CREATE_REQUEST})
        const {userLogin:{userInfo}}=getState()
        const config={headers:{"content-type":"application/json",Authorization:`Bearer ${userInfo.token}`}}
        const {data}=await axios.post("http://localhost:5000/api/order",order,config)
        dispatch({type:ORDER_CREATE_SUCCESS,payload:data})
    }catch(e){
        dispatch({type:ORDER_CREATE_FAIL,payload:e.response&&e.message ? e.response.message : e.message})
    }
}

export const getOrderDetails=(id)=>async(dispatch,getState)=>{
    try{
        dispatch({type:"ORDER_DETAILS_REQUEST"})
        const {userLogin:{userInfo}}=getState()
        const config={headers:{Authorization:`Bearer ${userInfo.token}`}}
        const {data}=await axios.get(`http://localhost:5000/api/order/${id}`,config)
        dispatch({type:"ORDER_DETAILS_SUCCESS",payload:data})
    }catch(e){
        dispatch({type:"ORDER_DETAILS_FAIL",payload:e.response&&e.message ? e.response.message : e.message})
    }
}

export const payOrder=(orderId,paymentResult)=>async(dispatch,getState)=>{
    try{
        dispatch({type:"ORDER_PAY_REQUEST"})
        const {userLogin:{userInfo}}=getState()
        const config={headers:{"Content-Type":"application/json",Authorization:`Bearer ${userInfo.token}`}}
        const {data}=await axios.put(`http://localhost:5000/api/order/${orderId}/pay`,paymentResult,config)
        dispatch({type:"ORDER_PAY_SUCCESS",payload:data})
    }catch(e){
        dispatch({type:"ORDER_PAY_FAIL",payload:e.response&&e.message ? e.response.message : e.message})
    }
}

export const listMyOrder=()=>async(dispatch,getState)=>{
    try{
        dispatch({type:"ORDER_LIST_MY_REQUEST"})
        const {userLogin:{userInfo}}=getState()
        const config={headers:{Authorization:`Bearer ${userInfo.token}`}}
        const {data}=await axios.get("http://localhost:5000/api/order/myorders",config)
        dispatch({type:"ORDER_LIST_MY_SUCCESS",payload:data})
    }catch(e){
        dispatch({type:"ORDER_LIST_MY_FAIL",payload:e.response&&e.message ? e.response.message : e.message})
    }
}

export const listOrder=()=>async(dispatch,getState)=>{
    try{
        dispatch({type:"ORDER_LIST_REQUEST"})
        const {userLogin:{userInfo}}=getState()
        const config={headers:{Authorization:`Bearer ${userInfo.token}`}}
        const {data}=await axios.get("http://localhost:5000/api/order",config)
        dispatch({type:"ORDER_LIST_SUCCESS",payload:data})
    }catch(e){
        dispatch({type:"ORDER_LIST_FAIL",payload:e.response&&e.message ? e.response.message : e.message})
    }
}

export const delivereOrder=(order)=>async(dispatch,getState)=>{
    try{
        dispatch({type:"ORDER_DELIVERE_REQUEST"})
        const {userLogin:{userInfo}}=getState()
        const config={headers:{Authorization:`Bearer ${userInfo.token}`}}
        const {data}=await axios.put(`http://localhost:5000/api/order/${order._id}/delivere`,{},config)
        dispatch({type:"ORDER_DELIVERE_SUCCESS",payload:data})
    }catch(e){
        dispatch({type:"ORDER_DELIVERE_FAIL",payload:e.response&&e.message ? e.response.message : e.message})
    }
}


// export const listMyOrder2(){
//     async(dispatch,getState){
//         try{
//             dispatch({type:"ORDER_LIST_MY_REQUEST"})
//             const {userLogin:{userInfo}}=getState()
//             const config={headers:{Authorization:`Bearer ${userInfo.token}`}}
//             const {data}=await axios.get("http://localhost:5000/api/order/myorders",config)
//             dispatch({type:"ORDER_LIST_MY_SUCCESS",payload:data})
//         }catch(e){
//             dispatch({type:"ORDER_LIST_MY_FAIL",payload:e.response&&e.message ? e.response.message : e.message})
//         }
//     }
// }
