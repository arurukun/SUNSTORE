import express from "express"
const router = express.Router()
import multer from "multer"
import path from "path"

const storage=multer.diskStorage({
    destination(req,file,cd){
        cd(null,"uploads/")
    },
    filename(req,file,cd){
        cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

function checkFileType(file,cb){
    const filetypes=/jpg | jpeg | png/
    const extname=filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype=filetypes.test(file.mimetype)

    if(extname && mimetype){
        return cd(null,ture)
    }else{
        cd("Images only!")
    }
}

const upload=multer({
    storage,
    fileFilter:function(req,file,cb){
        checkFileType(file,cb)
    },
})

router.post("/",upload.single("image"),(req,res)=>{
    res.send(`/${req.file.path}`)
})

export default router