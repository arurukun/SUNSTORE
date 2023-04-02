import asyncHandler from "express-async-handler"
import Product from "../Data/models/productModel.js"
 const getProducts=asyncHandler(async(req,res)=>{
    const products=await Product.find({})
    res.json(products)
 })

 const getProductById=asyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.yu)

    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error("Product not find")
    }
 })

// const getProductById=async(req,res)=>{
//     try{
//         const product=await Product.findById(req.params.yu)

//         if(product){
//             res.json(product)
//         }else{
//             res.status(404)
//             throw new Error("Product not find")
//         }
//     }catch(err){
//         res.status(400)
//         throw new Error(err.message)
//     }
//  }

 export {getProducts,getProductById}