import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import {listProductDetails,updateProduct} from "../action/productAction"

export const ProductEditScreen = ({match,history}) => {
    const productId=match.params.id
    const [name,setName]=useState("")
    const [price,setPrice]=useState(0)
    const [image,setImage]=useState("")
    const [brand,setBrand]=useState("")
    const [category,setCategory]=useState("")
    const [countInStock,setCountInStock]=useState("")
    const [description,setDescription]=useState("")

    const dispatch=useDispatch()

    const {loading,error,product}=useSelector((state)=>state.productDetails)
    const {loading:loadingUpdate,error:errorUpdate,success:successUpdate}=useSelector((state)=>state.productUpdate)

    useEffect(()=>{
        if(product){
            // console.log(product)
            if(product && successUpdate){
                dispatch({type:"PRODUCT_UPDATE_RESET"})
                history.push("/admin/productlist")
            }else{

                if(product.name == null || product._id !== productId){
                    dispatch(listProductDetails(productId))
                }else{
                    setName(product.name)
                    setPrice(product.price)
                    setImage(product.image)
                    setBrand(product.brand)
                    setCategory(product.category)
                    setCountInStock(product.countInStock)
                    setDescription(product.description)
                }
            }
        }
    },[dispatch,productId,product,history])    

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(updateProduct({_id:productId,name,price,image,brand,category,countInStock,}))
        history.push("/admin/productlist")
    }
  return (
    <div className='flex flex-col items-center justify-center border border-yellow-900 mt-10 pb-4 pt-2 md:w-2/5 mx-auto'>
        <h1 className='text-3xl text-yellow-500'>Edit Product</h1>
        {error && <div className='text-red-600 bg-red-300 w-full mt-4 text-center'>! {error}</div>}
        {loading && <div>Loading...</div>}
        {errorUpdate && <div className='text-red-600 bg-red-300 w-full mt-4 text-center'>! {errorUpdate}</div>}
        {loadingUpdate && <div>Loading...</div>}
        <form className='flex flex-col mt-2 w-full p-4'>
            <label className='text-yellow-500'>Name</label>
            <input type="text" placeholder='Enter name' value={name} onChange={(e)=>setName(e.target.value)} className="border border-yellow-700 "></input>
            <label className='text-yellow-500'>Price</label>
            <input type="number" placeholder='Enter price' value={price} onChange={(e)=>setPrice(e.target.value)} className="border border-yellow-700 "></input>

                <form action="/upload" method="POST" enctype="multipart/form-data" class="w-full max-w-lg mx-auto">
                <div class="flex flex-wrap">
                    <label for="image" class="text-yellow-500 p-1">
                    Upload Image:
                    </label>
                    <input type="file" name="image" id="image" class="appearance-none rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                </form>
            <label className='text-yellow-500'>Brand</label>
            <input type="text" placeholder='Enter brand' value={brand} onChange={(e)=>setBrand(e.target.value)} className="border border-yellow-700 "></input>            
            <label className='text-yellow-500'>category</label>
            <input type="text" placeholder='Enter category' value={category} onChange={(e)=>setCategory(e.target.value)} className="border border-yellow-700 "></input>            
            <label className='text-yellow-500'>CountInStock</label>
            <input type="number" placeholder='Enter countInStock' value={countInStock} onChange={(e)=>setCountInStock(e.target.value)} className="border border-yellow-700 "></input>
            <label className='text-yellow-500'>Description</label>
            <input type="text" placeholder='Enter description' value={description} onChange={(e)=>setDescription(e.target.value)} className="border border-yellow-700 "></input>
            <label className='flex'>
            </label>
            <button onClick={submitHandler} className="bg-yellow-500 text-yellow-800 px-4 py-2 hover:bg-yellow-300 my-4 mx-auto">UPDATE</button>
        </form>
        
    </div>
  )
}
