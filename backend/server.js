import express from "express"
import products from "./Data/products.js"
import dotenv from "dotenv"
import connect from "./Data/mongoose.js"
import colors from "colors"

const app = express()
app.use(express.json())
dotenv.config()
connect()

const PORT=process.env.PORT || 5000
app.listen(PORT,console.log(`This is ${PORT}`.rainbow))

app.get("/api/product",async(req,res)=>{
    res.json(products)
})

app.get("/api/product/:yu",(req,res)=>{
    const product=products.find((item)=>{
        return item._id===req.params.yu
    })
    res.json(product)
})

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