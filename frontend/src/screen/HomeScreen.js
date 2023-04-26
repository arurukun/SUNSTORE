import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
// import axios from "axios"

import {useDispatch,useSelector} from "react-redux"
import { listProducts } from '../action/productAction'

const HomeScreen = () => {
    // const [products, setProducts] = useState([])
    const dispatch=useDispatch()

    const productList=useSelector(state=>state.productList)
    const {loading,error,products} =productList

    useEffect(()=>{
//         async function callItem(){
// //          response comes = request goes
//             const res      = await axios.get("/api/product")

//             console.log(res)
//             setProducts(res.data)
//         } 
//         callItem()


        dispatch(listProducts())
    },[dispatch])


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
                    {/* <a href={`http://localhost:3000/product/${item._id}`}> */}
                    <Link to={"/product/" + item._id}>
                        <img src={item.image}></img>
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

// {
//     _id: '6',
//     name: 'Amazon Echo Dot 3rd Generation',
//     image: '/images/alexa.jpg',
//     description:
//       'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
//     brand: 'Amazon',
//     category: 'Electronics',
//     price: 29.99,
//     countInStock: 0,
//     rating: 4,
//     numReviews: 12,
//   },
export default HomeScreen
