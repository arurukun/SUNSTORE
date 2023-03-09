import express from "express"
const app=express.Router()

import Product from "../Data/models/productModel.js"

app.get("/",async(req,res)=>{
    const products=await Product.find({})
    // res.status(401)
    // throw new Error("Not Authorized")
    res.json(products)
})

app.get("/:ka",async(req,res)=>{
    const product=await Product.findById(req.params.ka)
    if(product){
        res.json(product)
    }else{
        res.status(404).json({message:"Product not found!!!"})
    }
})


export default app