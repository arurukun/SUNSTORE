import express from "express"
import dotenv from "dotenv"
import connect from "./Data/mongoose.js"
import cors from "cors"
import colors from "colors"

import productRoutes from "./routes/productRoute.js"
import userRoutes from"./routes/userRoute.js"
import orderRoutes from "./routes/orderRoute.js"
const app = express()
app.use(cors("*"))
app.use(express.json())
dotenv.config()
connect()
app.use(express.json())

// app.get("/", async(req,res)=>{res.json({"message":"Hi how are you..."})})
app.get("/", async(req,res)=>{res.json({message:"Hi how are you..."})})

app.use("/api/product",productRoutes)
app.use("/api/user",userRoutes)
app.use("/api/order",orderRoutes)

const PORT=process.env.PORT || 5000
app.listen(PORT,console.log(`This is ${PORT}`.rainbow))



// app.post("/api/product",async(req,res)=>{
//     products=products + newProd
//     res.json(products)
// })

// app.delete("/api/product",async(req,res)=>{
//     products=products - newProd
//     res.json(products)
// })

// import colors from "./routes/colors.js"

// app.use("/blue",colors)

// app.post("/blue",async(req,res)=>{
//     res.json(req.body)
// })