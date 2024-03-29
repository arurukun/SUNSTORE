import express from "express"
const router=express.Router()
import { authUser, deleteUser, getUserById, getUserProfile, getUsers, registerUser, updateUser, updateUserProfile } from "../controllers/userController.js"
import {protect,admin} from "../middleware/authMiddleware.js"

router.route("/").post(registerUser).get(protect,admin,getUsers)
router.post("/login",authUser)
router.route("/profile").get(protect,getUserProfile).put(protect,updateUserProfile)
router.route("/:yu").delete(protect,admin,deleteUser).get(protect,admin,getUserById).put(protect,admin,updateUser)

export default router