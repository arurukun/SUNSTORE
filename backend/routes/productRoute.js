import express from "express"
const router=express.Router()

// import Product from "../Data/models/productModel.js"
import { getProducts,getProductById, deleteProduct, createProduct, updateProduct } from "../controllers/productController.js"
import {protect,admin} from "../middleware/authMiddleware.js"

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
router.route("/").get(getProducts).post(protect,admin,createProduct)
router.route("/:yu").get(getProductById).delete(protect,admin,deleteProduct).put(protect,admin,updateProduct)

export default router