import {Schema,model} from "mongoose";

const reviewSchema=Schema({
    name:{type:String,required:true},
    rating:{type:Number,required:true},
    comment:{type:String,required:true},
},{
    timestamps:true
})

const productSchema=Schema({
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"UserShra"
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
        
    },
    brand:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    reviews:[reviewSchema],
    rating:{
        type:Number,
        required:true,
        default:0
    },
    numReview:{
        type:Number,
        required:true,
        default:0
    },
    price:{
        type:Number,
        required:true,
    },
    countInStock:{
        type:Number,
        required:true,
    },

},{
    timestamps:true
})

const Product=model("ProductShra",productSchema)

export default Product