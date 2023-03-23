import express from "express"
const router=express.Router()

// import Product from "../Data/models/productModel.js"
import { getProducts,getProductById } from "../contorollers/productContoroller"

// router.get("/",async(req,res)=>{
//     const products=await Product.find({})
//     // res.status(401)
//     // throw new Error("Not Authorized")
//     res.json(products)
// })

// router.get("/:ka",async(req,res)=>{
//     const product=await Product.findById(req.params.ka)
//     if(product){
//         res.json(product)
//     }else{
//         res.status(404).json({message:"Product not found!!!"})
//     }
// })
router.route("/").get(getProducts)
router.route("/:yu").get(getProductById)

export default router