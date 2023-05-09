import express from "express"
import dotenv from "dotenv"
import connect from "./Data/mongoose.js"
import cors from "cors"
import colors from "colors"
import path from "path"

import productRoutes from "./routes/productRoute.js"
import userRoutes from"./routes/userRoute.js"
import orderRoutes from "./routes/orderRoute.js"
import uploadRoutes from './routes/uploadRoutes.js'

const app = express()
app.use(cors("*"))
app.use(express.json())
dotenv.config()
connect()
app.use(express.json())

app.use("/static", express.static(path.resolve() + "/uploads"))

app.get("/api/config/paypal", (req,res)=>{res.json(process.env.PAYPAL_CLIENT_ID)})

app.get("/", async(req,res)=>{res.json({message:"Hi how are you..."})})

app.use("/api/product",productRoutes)
app.use("/api/user",userRoutes)
app.use("/api/order",orderRoutes)
app.use("/api/upload",uploadRoutes)

const PORT=process.env.PORT || 5000
app.listen(PORT,console.log(`This is ${PORT}`.rainbow))

