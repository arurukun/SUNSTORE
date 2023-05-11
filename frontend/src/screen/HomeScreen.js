import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
// import axios from "axios"

import {useDispatch,useSelector} from "react-redux"
import { listProducts } from '../action/productAction'

const HomeScreen = ({match}) => {
    // const [products, setProducts] = useState([])
    const keyword=match.params.keyword
    const dispatch=useDispatch()

    const productList=useSelector(state=>state.productList)
    const {loading,error,products} =productList

    useEffect(()=>{
//         async function callItem(){
// //          response comes = request goes
//             const res      = await axios.get("/api/product")

// console.log(res)
//             setProducts(res.data)
//         } 
//         callItem()

        dispatch(listProducts(keyword))
    },[dispatch,keyword])


  return (
    <>
        <div className='m-6 text-4xl text-yellow-500'>Latest Products</div>
        {loading ? 
        <h2>Loading...</h2> 
        : error ? 
        <h3>{error}</h3> 
        :
        <div className='grid md:grid-cols-4 gap-4 mb-4 sm:grid-cols-1'>{products.map((item)=>{
            return (
                <div className=' border border-black p-2'>
                    <Link to={"/product/" + item._id}>
                        <img src={'/static'+item.image}></img>
                        <div className='text-2xl mt-2'>{item.name}</div>
                    </Link>
                    <div className='text-sm my-2'>{item.price}</div>
                    <div className="flex">
                        <span>{item.rating >0 ? <i className="fas fa-star text-yellow-500"></i> : <i className="far fa-star text-yellow-500"></i>}</span>
                        <span>{item.rating >1 ? <i className="fas fa-star text-yellow-500"></i> : <i className="far fa-star text-yellow-500"></i>}</span>
                        <span>{item.rating >2 ? <i className="fas fa-star text-yellow-500"></i> : <i className="far fa-star text-yellow-500"></i>}</span>
                        <span>{item.rating >3 ? <i className="fas fa-star text-yellow-500"></i> : <i className="far fa-star text-yellow-500"></i>}</span>
                        <span>{item.rating >4 ? <i className="fas fa-star text-yellow-500"></i> : <i className="far fa-star text-yellow-500"></i>}</span>
                        <div className='flex-grow'/>
                        <p>{item.numReviews} rev</p>
                    </div>
                </div>
            )
        })}</div>
        }
        
        
    </>
  )
}

export default HomeScreen
