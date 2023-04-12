import asyncHandler from "express-async-handler"
import User from "../Data/models/usersModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const authUser=asyncHandler(async(req,res)=>{
    const {email,password:pass}=req.body
    console.log(email)
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
        res.status(401).send("Invalid email or password")
        // res.status(401)
        // throw new Error("Invalid email or password")
    }
})

const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body
    const userExists=await User.findOne({email})
    if(userExists){
        res.status(400).send("User already exists")
        // throw new Error("User already exists")
    }
    
    const passwordHash=await bcrypt.hash(password, 10)
    const user =await User.create({name,email,password:passwordHash})
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"30d"})
        })
    }else{
        res.status(400).send("Invalid user data")
        // throw new Error("Invalid user data")
    }
})

const getUserProfile=asyncHandler(async(req,res)=>{
    res.json(req.user)
})

const updateUserProfile=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id)
    if(user){
        user.name=req.body.name || user.name
        user.email=req.body.email || user.email
        if(req.body.password){
            user.password=req.body.password
        }
        const updateUser=await user.save()
        res.json({
            _id:updateUser._id,
            name:updateUser.name,
            email:updateUser.email,
            isAdmin:updateUser.isAdmin,
            token:jwt.sign({userId:updateUser._id},process.env.JWT_SECRET,{expiresIn:"30d"})
        })
    }else{
        res.status(404).send("User not found")
    }
})

export {authUser,registerUser,getUserProfile,updateUserProfile}