import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "../Data/models/usersModel.js"

const protect=asyncHandler(async(req,res,next)=>{
    let token
    if(req.headers.authorization&&req.headers.authorization.startsWith("Bearer")){
        try{
            token=req.headers.authorization.split(" ")[1]
            const decode=jwt.verify(token,process.env.JWT_SECRET)
            req.user=await User.findById(decode.userId).select("-password")
            // console.log(req.user)
            next()
        }catch(e){
            console.log(e)
            res.status(401)
            throw new Error("Not authorized,token failed")
        }
    }

    if(!token){
        res.status(401)
        throw new Error("Not authorized,no token")
    }
})

export default protect