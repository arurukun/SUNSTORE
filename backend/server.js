import express from "express"

const app = express()
app.use(express.json())

const PORT=5000
app.listen(PORT,console.log(`this is ${PORT}`))

import colors from "./routes/colors.js"

app.use("/blue",colors)

// app.post("/blue",async(req,res)=>{
//     res.json(req.body)
// })