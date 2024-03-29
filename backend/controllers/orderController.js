import asyncHandler from "express-async-handler"
import Order from "../data/models/ordersModel.js"

const addOrderItems=asyncHandler(async(req,res)=>{
    const {orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice}=req.body
    
    if(orderItems&&orderItems.length===0){
        res.status(400).send("No order items")
    }else{
        const order= new Order({orderItems,user:req.user._id,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice})
        const createdOrder=await order.save()
        res.status(201).json(createdOrder)
    }
})

const getOrderById=asyncHandler(async(req,res)=>{
    // const order=await Order.findById(req.params.id)
    const order=await Order.findById(req.params.id).populate("user","name email")
// console.log(order)
    if(order){
        res.json(order)
    }else{
        res.status(404).send("Order not found")
    }
})

const updateOrderToPaid=asyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id)
    if(order){
        order.isPaid=true,
        order.paidAt=Date.now(),
        order.paymentResult={
            id:req.body.status,
            status:req.body.status,
            update_time:req.body.update_time,
            email_address:req.body.payer.email_address
        }
        
        const updateOrder=await order.save()
        res.json(updateOrder)
    }else{
        res.status(404).send("Order not found")
    }
})

const getMyOrders=asyncHandler(async(req,res)=>{
    const orders=await Order.find({user:req.user._id})
    res.json(orders)
// console.log(orders)
})

const getOrders=asyncHandler(async(req,res)=>{
    const orders=await Order.find({}).populate("user", "name")
    res.json(orders)
})

const updateOrderToDelivered=asyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id)
// console.log(order)
    if(order){
        order.isDelivered=true,
        order.deliveredAt=Date.now()
        
        const updateOrder=await order.save()
        res.json(updateOrder)
    }else{
        res.status(404).send("Order not found")
    }
})

export  {addOrderItems,getOrderById,updateOrderToPaid,getMyOrders,getOrders,updateOrderToDelivered}