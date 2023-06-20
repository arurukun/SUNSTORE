import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails,createProductReview } from '../action/productAction'
import { Link } from 'react-router-dom'
// import axios from "axios"
// const ProductScreen = (props) => {
const ProductScreen = ({history,match}) => {

  // const [product,setProduct]=useState([])

  const [qty,setQty]=useState(1)
  const [rating,setRating]=useState(0)
  const [comment,setComment]=useState("")

  const dispatch=useDispatch()
  const productDetails=useSelector(state=>state.productDetails)
  const {loading,error,product} =productDetails
  const {success:successProductReview,error:errorProductReview} =useSelector((s)=>s.productReviewCreate)
  const {userInfo}=useSelector((s)=>s.userLogin)

  useEffect(()=>{
    // async function getItem(){
    //   const res=await axios.get(`/api/product/${props.match.params.yu}`)
    //   setProduct(res.data)
// console.log(res)
    // }
    // getItem()

    if(successProductReview){
      alert("Review Submitted")
      setRating(0)
      setComment("")
      dispatch({type:"PRODUCT_CREATE_REVIEW_RESET"})
    }

    dispatch(listProductDetails(match.params.yu))
  },[dispatch,match,successProductReview])

  const addToCartHandler=()=>{
    history.push(`/cart/${match.params.yu}?qty=${qty}`)
  }

  const submitHandler=(e)=>{
    e.preventDefault()
    dispatch(createProductReview(match.params.yu,{rating,comment}))
  }

    return (
      <>
        {loading ? 
        <h2 className='text-2xl text-center'>Loaing...</h2> 
        : error? 
        <h3 className='text-2xl text-center text-red-700 bg-red-300 h-16'>{error}</h3> 
        :
        <div>
        <div className='grid md:grid-cols-10 grid-cols-1 gap-3 mt-12'>
        <div className='md:col-span-4'>
          <img src={`${process.env.REACT_APP_BACKEND_URL}/static`+product.image} alt="" className='fluid' ></img>
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

      <div>
        <div className='mt-4'>
          <h2 className='text-2xl mb-2'>Review</h2>
          {product && product.reviews && product.reviews.length == 0 && <div>No Reviews</div>}
        </div>
        <div className='ml-4 divide-y-2 md:w-5/12'>
          {product && product.reviews && product.reviews.map((review)=>(
            <div key={review._id}>
              <p className='text-sm'>{review.name}</p>
              <div className="flex">
                <span>{review.rating >0 ? <i className="fas fa-star text-yellow-300"></i> : <i className="far fa-star text-yellow-300"></i>}</span>
                <span>{review.rating >1 ? <i className="fas fa-star text-yellow-300"></i> : <i className="far fa-star text-yellow-300"></i>}</span>
                <span>{review.rating >2 ? <i className="fas fa-star text-yellow-300"></i> : <i className="far fa-star text-yellow-300"></i>}</span>
                <span>{review.rating >3 ? <i className="fas fa-star text-yellow-300"></i> : <i className="far fa-star text-yellow-300"></i>}</span>
                <span>{review.rating >4 ? <i className="fas fa-star text-yellow-300"></i> : <i className="far fa-star text-yellow-300"></i>}</span>
              </div>
              <p className='text-sm'>{review.createdAt.substring(0,10)}</p>
              <p className='mt-2 mb-4'>{review.comment}</p>
            </div>
          ))}
          <div className='mt-4'>
            <h2 className='text-2xl mb-2 p-2'>Write a Customer Review</h2>
            {errorProductReview && <div>{errorProductReview}</div>}
            {userInfo ? 
            (<form onSubmit={submitHandler} className='flex flex-col'>
              <label className='mb-1'>Rating</label>
              <select value={rating} onChange={(e)=>setRating(e.target.value)} className='border-2'>
                <option value="">Select...</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
              <label className='m-1'>Comment</label>
              <input type="textarea" value={comment} onChange={(e)=>setComment(e.target.value)} className='border-2 py-4'></input>
              <button type="submit" className="bg-yellow-500 text-yellow-800 px-4 py-2 hover:bg-yellow-300 my-4 mx-auto">Submit</button>
            </form>)
            : 
            (<p>Please <Link to="/login">sign in </Link>to write a review</p>)}
          </div>
        </div>
      </div>
      </div>
        }
      </>
   
  )

}

export default ProductScreen