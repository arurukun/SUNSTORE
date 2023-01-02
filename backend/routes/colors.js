import express from "express";
const router = express.Router();

router.post("/yuki",async(req,res)=>{
    res.json(req.body)
})
router.post("/yuri",async(req,res)=>{
    res.json({"name":"my name is yuri"})
})
router.post("/shura",async(req,res)=>{
    res.json({"name":"my name is shura"})
    // res.json(req.body)
})


export default router;