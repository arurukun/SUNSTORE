// export const productListReducer=(state={products:[]},action)=>{
//     // action 何らかの操作を表す　object storeに対してデータの実行するために送信される
//     switch(action.type){
//         //action.type action objectがどのような操作を行うのかを表すもの　大文字で記入していく
//         case'PRODUCT_LIST_REQUEST':
//             return{loading:true,products:[]}
//         case'PRODUCT_LIST_SUCCESS':
//             return{loading:false,products:action.payload}
//             // payload action objectが持つ本来の目的であるデータのこと　追加記入する感じ　必須ではない　オプション
//         case'PRODUCT_LIST_FAIL':
//             return{loading:false,error:action.payload}
//         default:
//             return state
//     }
// }

import {PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL} from "../constants/productConstants"

export const productListReducer=(state={products:[]},action)=>{
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return{loading:true,products:[]}
        case PRODUCT_LIST_SUCCESS:
            return{loading:false,products:action.payload}
        case PRODUCT_LIST_FAIL:
            return{loading:false,error:action.payload}
        default:
            return state
    }
}

export const productDetailsReducer=(state={product:{}},action)=>{
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return{loading:true,...state}
        case PRODUCT_DETAILS_SUCCESS:
            return{loading:false,product:action.payload}
        case PRODUCT_DETAILS_FAIL:
            return{loading:false,error:action.payload}
        default:
            return state
    }
}

export const productDeleteReducer=(state={},action)=>{
    switch(action.type){
        case "PRODUCT_DELETE_REQUEST":
            return{loading:true}
        case "PRODUCT_DELETE_SUCCESS":
            return{loading:false,success:true}
        case "PRODUCT_DELETE_FAIL":
            return{loading:false,error:action.payload}
        default:
            return state
    }
}

export const productCreateReducer=(state={},action)=>{
    switch(action.type){
        case "PRODUCT_CREATE_REQUEST":
            return{loading:true}
        case "PRODUCT_CREATE_SUCCESS":
            console.log(action.payload)
            return{loading:false,success:true,product:action.payload}
        case "PRODUCT_CREATE_FAIL":
            return{loading:false,error:action.payload}
        case "PRODUCT_CREATE_RESET":
            return {}
        default:
            return state
    }
}

export const productUpdateReducer=(state={product:{}},action)=>{
    switch(action.type){
        case "PRODUCT_UPDATE_REQUEST":
            return{loading:true}
        case "PRODUCT_UPDATE_SUCCESS":
            console.log(action.type)
            return{loading:false,success:true,product:action.payload}
        case "PRODUCT_UPDATE_FAIL":
            return{loading:false,error:action.payload}
        case "PRODUCT_UPDATE_RESET":
            return {product:{}}
        default:
            return state
    }
}