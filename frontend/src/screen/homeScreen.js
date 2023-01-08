import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"

const HomeScreen = () => {
    const [products, setProducts] = useState([])

    useEffect(()=>{
        async function callItem(){
            const res=await axios.get("/api/product")
            console.log(res)
            setProducts(res.data)
        } 
        callItem()
    },[])

  return (
    <>
        <p className='text-3xl my-4'>- Latest Products -</p>
        <div className='grid grid-cols-4 gap-4'>
            {products.map(product=>{
                return (<div className='p-2 border-2 rounded'>
                    <Link to={`/product/${product._id}`}>
                        <img src={product.image} />
                        <p className='text-2xl'> {product.name}</p>
                        <p className='text-md my-2'>{`$ ${product.price}`}</p>
                        <div className="flex">
                            <span>{product.rating >0 ? <i className="fas fa-star text-yellow-500"></i> : <i className="far fa-star text-yellow-500"></i>}</span>
                            <span>{product.rating >1 ? <i className="fas fa-star text-yellow-500"></i> : <i className="far fa-star text-yellow-500"></i>}</span>
                            <span>{product.rating >2 ? <i className="fas fa-star text-yellow-500"></i> : <i className="far fa-star text-yellow-500"></i>}</span>
                            <span>{product.rating >3 ? <i className="fas fa-star text-yellow-500"></i> : <i className="far fa-star text-yellow-500"></i>}</span>
                            <span>{product.rating >4 ? <i className="fas fa-star text-yellow-500"></i> : <i className="far fa-star text-yellow-500"></i>}</span>
                            <div className='flex-grow'/>
                            <p>{product.numReviews} Reviews</p>
                        </div>
                    </Link>
                </div>)
            })}
        </div>
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