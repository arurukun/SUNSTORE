import axios from "axios"
import {PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL} from "../constants/productConstants"

export const listProducts=(keyword="")=>async (dispatch)=>{
    try{
        dispatch({type:PRODUCT_LIST_REQUEST})
        const {data}=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/product?keyword=${keyword}`)
        dispatch({
            type:PRODUCT_LIST_SUCCESS,
            payload:data
        })
    } catch(e){
        dispatch({
            type:PRODUCT_LIST_FAIL,
            payload:e.response && e.response.data.message ? e.response.data.message : e.message
        })
    }
}

export const listProductDetails=(yu)=>async (dispatch)=>{
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST})
        const {data}=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/product/${yu}`)
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data
        })
    } catch(e){
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:e.response && e.response.data.message ? e.response.data.message : e.message
        })
    }
}

export const deleteProduct=(id)=>async(dispatch,getState)=>{
    try{
        dispatch({type:"PRODUCT_DELETE_REQUEST"})
        const {userLogin:{userInfo}}=getState()
        const config={headers:{Authorization:`Bearer ${userInfo.token}`}}
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/product/${id}`,config)
        dispatch({type:"PRODUCT_DELETE_SUCCESS"})
    }catch(e){
        dispatch({type:"PRODUCT_DELETE_FAIL",payload:e.response&&e.message ? e.response.message : e.message})
    }
}

export const createProduct=()=>async(dispatch,getState)=>{
    try{
        dispatch({type:"PRODUCT_CREATE_REQUEST"})
        const {userLogin:{userInfo}}=getState()
        const config={headers:{Authorization:`Bearer ${userInfo.token}`}}
// console.log("data")
        const {data}=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/product`,{},config)
// console.log(data)
        dispatch({type:"PRODUCT_CREATE_SUCCESS", payload:data})
    }catch(e){
        dispatch({type:"PRODUCT_CREATE_FAIL",payload:e.response&&e.message ? e.response.message : e.message})
    }
}

export const updateProduct=(product)=>async(dispatch,getState)=>{
// console.log(product)

    try{
        dispatch({type:"PRODUCT_UPDATE_REQUEST"})
        const {userLogin:{userInfo}}=getState()
        const config={"content-type":"application/json",headers:{Authorization:`Bearer ${userInfo.token}`}}
// console.log(product)
        const {data}=await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/product/${product._id}`,product,config)
// console.log(data)
        dispatch({type:"PRODUCT_UPDATE_SUCCESS", payload:data})
    }catch(e){
        dispatch({type:"PRODUCT_UPDATE_FAIL",payload:e.response&&e.message ? e.response.message : e.message})
    }
}

export const createProductReview=(productId,review)=>async(dispatch,getState)=>{
    try{
        dispatch({type:"PRODUCT_CREATE_REVIEW_REQUEST"})
        const {userLogin:{userInfo}}=getState()
        const config={"content-type":"application/json",headers:{Authorization:`Bearer ${userInfo.token}`}}
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/product/${productId}/reviews`,review,config)
        dispatch({type:"PRODUCT_CREATE_REVIEW_SUCCESS"})
    }catch(e){
        dispatch({type:"PRODUCT_CREATE_REVIEW_FAIL",payload:e.response&&e.message ? e.response.message : e.message})
    }
}