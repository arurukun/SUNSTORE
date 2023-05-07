import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../action/productAction'
// import axios from "axios"
// const ProductScreen = (props) => {
const ProductScreen = ({history,match}) => {

  // const [product,setProduct]=useState([])

  const [qty,setQty]=useState(1)

  const dispatch=useDispatch()
  const productDetails=useSelector(state=>state.productDetails)
  const {loading,error,product} =productDetails
  useEffect(()=>{
    // async function getItem(){
    //   const res=await axios.get(`/api/product/${props.match.params.yu}`)
    //   setProduct(res.data)
    //   console.log(res)
    // }
    // getItem()

    dispatch(listProductDetails(match.params.yu))
  },[dispatch,match])

  const addToCartHandler=()=>{
    history.push(`/cart/${match.params.yu}?qty=${qty}`)
  }

    return (
      <>
        {loading ? 
        <h2 className='text-2xl text-center'>Loaing...</h2> 
        : error? 
        <h3 className='text-2xl text-center text-red-700 bg-red-300 h-16'>{error}</h3> 
        :
        <div className='grid md:grid-cols-10 grid-cols-1 gap-3 mt-12'>
        <div className='md:col-span-4'>
          <img src={'http://localhost:5000/static'+product.image} alt="" className='fluid' ></img>
        </div>
        <div className='md:col-span-4'>
          <div className='text-4xl mb-4'>{product.name}</div>
          <div className="flex">
              <span>{product.rating >0 ? <i className="fas fa-star text-yellow-300"></i> : <i className="far fa-star text-yellow-300"></i>}</span>
              <span>{product.rating >1 ? <i className="fas fa-star text-yellow-300"></i> : <i className="far fa-star text-yellow-300"></i>}</span>
              <span>{product.rating >2 ? <i className="fas fa-star text-yellow-300"></i> : <i className="far fa-star text-yellow-300"></i>}</span>
              <span>{product.rating >3 ? <i className="fas fa-star text-yellow-300"></i> : <i className="far fa-star text-yellow-300"></i>}</span>
              <span>{product.rating >4 ? <i className="fas fa-star text-yellow-300"></i> : <i className="far fa-star text-yellow-300"></i>}</span>
              <p className='ml-4'>{product.numReviews} Reviews</p>
          </div>
          <div className='text-xl my-4'>${product.price}</div>
          <div className='text-md mb-3'>{product.description}</div>
        </div>
        <div className='col-span-2'>
          <div className='border border-gray-500 flex flex-col space-y-2 p-2 divide-y-2 rounded-md'>
            <div className='flex justify-between'>
                <p>Price:</p>
                <p>$ {product.price}</p>
            </div>
            <div className='flex justify-between'>
                <p>Brand:</p>
                <p>{product.brand}</p>
            </div>
            <div className='flex justify-between'>
                <p>Status:</p>
                <p className='text-right'>{product.countInStock === 0 ? "Out of stock" : +product.countInStock + " left"}</p>
            </div>

            {product.countInStock > 0 && (
              <div className='flex justify-between'>
                <p>Qty</p>
                <select value={qty} onChange={(e)=>setQty(e.target.value)} className='h-8'>
                  {[...Array(product.countInStock).keys()].map((x)=>{
                    return <option key={x+1} value={x+1}>{x+1}</option>
                  })}
                </select>
              </div>
            )}

            <div className='flex justify-center p-2'>
                <button onClick={addToCartHandler} className='bg-black text-white'>Add to cart</button>
            </div>
          </div>
        </div>
      </div>
        }
      </>
   
  )

}

export default ProductScreen