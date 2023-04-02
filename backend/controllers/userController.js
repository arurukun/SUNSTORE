import asyncHandler from "express-async-handler"
import User from "../Data/models/usersModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const authUser=asyncHandler(async(req,res)=>{
    const {email,password:pass}=req.body
    // res.json({email,password})
    const user=await User.findOne({email})
    if(user && (await bcrypt.compare(pass,user.password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"30d"})
        })
    }else{
        res.status(401)
        throw new Error("Invalid email or password")
    }
})

// email = {name:yuki, age:25};
// email="yuki@exam...."
const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body
    // email={email}
    // const userExists=await User.findOne({email:email})
    const userExists=await User.findOne({email})
    // const userExists=await User.findById(id)
    if(userExists){
        res.status(400)
        throw new Error("User already exists")
    }

    // fun1(id)
    // fun2() --> only take one parameter/argument
    // fun2(email, name, age) --> three argument
    const passwordHash=await bcrypt.hash(password, 10)
    const user =await User.create({name:name,email:email,password:passwordHash})
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"30d"})
        })
    }else{
        res.status(400)
        throw new Error("Invalid user data")
    }
})

const getUserProfile=asyncHandler(async(req,res)=>{
    res.json(req.user)
})

export {authUser,registerUser,getUserProfile}