import  mongoose from "mongoose"
// import  {connect} from "mongoose"

const connected=async ()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI,{
        // const conn=await connect(process.env.MONGO_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        console.log(`Connected to conn.connection.host: ${conn.connection.host}`.rainbow)
    }catch(error){
// console.log(error.message.red)
    }
}

export default connected