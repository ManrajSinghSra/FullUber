const mongoose=require("mongoose")

const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


const userSchema=new mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            required:true,
            minlength:[3,"First name cannot be less than 3"],
            maxLength:[30,"Email is too long"]
        },
        lastName:{
             type:String,
             minlength:[3,"First name cannot be less than 3"]
        }
    },
    email:{
        type:String,
        unique:true,
        required:true,
        minlength:[5,"Valid email must be provides"]

    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketId:{
         type:String,
    }
},{
    timestamps:true
}) 


userSchema.methods.getToken=function(){
    const token=jwt.sign({_id:this._id},process.env.secret,{expiresIn:"1d"})
    return token
}

userSchema.methods.comparePassword=async function(password) {
    const isValid=await bcrypt.compare(password,this.password)
    return isValid
}

userSchema.statics.bcryptPassword=async function(password){
    const hashPassword=await bcrypt.hash(password,10)
    return hashPassword
}
const userModel=mongoose.model("user",userSchema)

module.exports=userModel