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

const deleteProduct=asyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.yu)

    if(product){
        await product.remove()
        res.json({message:"Product removed"})
    }else{
        res.status(404)
        throw new Error("Product not find")
    }
 })

 const createProduct=asyncHandler(async(req,res)=>{
    const product = new Product({...req.body, user:req.user._id})
    const createdProduct=await product.save()
    res.status(201).send(createdProduct)
 })

 const updateProduct=asyncHandler(async(req,res)=>{
    // const {name}=req.body
    const {name,price,user,image,brand,category,countInStock,description}=req.body
    var product=await Product.findById(req.params.yu)

    if(product){
        product.name=name || product.name
        product.price=price || product.price
        product.user=user || product.user
        product.image=image || product.image
        product.brand=brand || product.brand
        product.category=category || product.category
        product.countInStock=countInStock || product.countInStock
        product.description=description || product.description

        const updateProduct=await product.save()
        res.json(updateProduct )
    }else{
        res.status(404).send("Product not found")
    }
 })


 export {getProducts,getProductById,deleteProduct,createProduct,updateProduct}