const  mongoose=require("mongoose")


const blackListSchema=new mongoose.Schema({
    token:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:86000
    }
})

const blModel=mongoose.model("BlackListSchema",blackListSchema)

module.exports=blModel