import {Schema,model} from "mongoose"

const orderSchema=Schema({
    orderItems:[{
        qty:{type:Number,required:true},
        product:{type:Schema.Types.ObjectId,required:true,ref:"ProductShra"}
    }],
    shippingAdress:{
        address:{type:String,required:true},
        country:{type:String,required:true},
        city:{type:String,required:true},
        postalCode:{type:Number,required:true},      
    },
    paymentMethod:{
        type:String,
        required:true,
    },
    paymentResult:{
        id:{type:Number},
        status:{type:String},
        update_time:{type:Number},
        email_address:{type:String}
    },
    taxPrice:{
        type:Number,
        required:true,
    },
    shippingPrice:{
        type:Number,
        required:true,
    },
    totalPrice:{
        type:Number,
        required:true,
    },
    isPaid:{
        type:Boolean,
        required:true,
        default:false
    },
    paidAt:{
        type:Date
    },
    isDeliverd:{
        type:Boolean,
        required:true,
        default:false
    },
    deliverdAt:{
        type:Date
    }

},{timestamps:true})

const Order=model("OrderShra",orderSchema)

export default Order