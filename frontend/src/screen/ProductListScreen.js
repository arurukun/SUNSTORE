import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { listProducts,deleteProduct, createProduct} from '../action/productAction'
import { Link } from 'react-router-dom'

export const ProductListScreen = ({history}) => {
    const {loading,products,error}=useSelector((s)=>s.productList)
    const {userInfo}=useSelector((s)=>s.userLogin)
    const {loading:loadingDelete,error:errorDelete,success:successDelete} = useSelector((s)=>s.productDelete)
    const {loading:loadingCreate,error:errorCreate,success:successCreate,product:createdProduct} = useSelector((s)=>s.productCreate)

    const dispatch=useDispatch()
    useEffect(()=>{
      if(!userInfo){
        history.push("/login")
      }
// console.log(successCreate)
      if(userInfo && successCreate){
// console.log(createdProduct)
        // history.push(`/admin/product/${createdProduct}/edit`)
      }else{
        dispatch(listProducts())
      }
    },[dispatch,history,userInfo,successDelete,successCreate,createdProduct])

    const createProductHandler=()=>{
        dispatch(createProduct())
    }

    const deleteHandler=(id)=>{
      if(window.confirm("Are you sure")){
        dispatch(deleteProduct(id))
      }
    }

// console.log(products)
  return (
    <div>
        <div className='flex flex-row justify-between mt-4'>
            <h1 className='text-3xl text-yellow-500'>Products</h1>
            <button onClick={createProductHandler} className='bg-yellow-400 hover:bg-yellow-200 py-2 px-3 rounded-lg ml-2 text-amber-900 hover:text-amber-700'><i className='fas- fa-plus'>Create Product</i></button>
        </div>
        {loadingDelete && <div>Loading...</div>}
        {errorDelete && <div className='text-red-600'>{errorDelete}</div>}
        {loadingCreate && <div>Loading...</div>}
        {errorCreate && <div className='text-red-600'>{errorCreate}</div>}
        {loading ? <div>Loading...</div> : error ? <div className='text-red-600'>{error}</div> : 
    <table className='table-auto border-2 border-slate-500 my-4'>
    <thead>
      <tr>
        {/* <th className='border-2 border-slate-600 p-2'>ID</th> */}
        <th className='border-2 border-slate-600 p-2'>ID</th>
        <th className='border-2 border-slate-600 p-2 px-8'>NAME</th>
        <th className='border-2 border-slate-600 p-2 px-8'>PRICE</th>
        {/* <th className='border-2 border-slate-600 p-2 px-8'>CATEGORY</th> */}
        <th className='border-2 border-slate-600 p-2 px-8'>BRAND</th>
        <th className='border-2 border-slate-600 p-2 px-8'></th>
      </tr>
    </thead>
    <tbody>
      {products && products.map((product)=>(
        <tr key={product._id}>
          {/* <td className='border-2 border-slate-700 p-2'>{users._id.substring(18,)}</td> */}
          <td className='border-2 border-slate-700 p-2'>{product._id.substring(18,)}</td>
          <td className='border-2 border-slate-700 p-2'>{product.name}</td>
          <td className='border-2 border-slate-700 p-2'>${product.price}</td>
          {/* <td className='border-2 border-slate-700 p-2'>{product.category}</td> */}
          <td className='border-2 border-slate-700 p-2'>{product.brand}</td>
          <td className='border-2 border-slate-700 p-2 '>
            <Link to={`/admin/product/${product._id}/edit`} className='bg-yellow-400 hover:bg-yellow-200 py-2 px-3 rounded-lg sm:ml-2'><i className='fas fa-edit'></i></Link>
            <button onClick={()=>deleteHandler(product._id)} className='bg-yellow-400 hover:bg-yellow-200 py-2 px-3 rounded-lg ml-2 sm:ml-2 sm:mt-2'><i className='fas fa-trash'></i></button>
          </td>
        </tr>
      ))}
    </tbody>      
    </table>
    }</div>
  )
}
