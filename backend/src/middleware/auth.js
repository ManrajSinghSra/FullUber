const jwt=require("jsonwebtoken")
const Blk=require("../models/blacklist")
const User=require("../models/user") 

const Auth=async(req,res,next)=>{
  
    try {
        const {token}=req.cookies 
 
    if(!token){
        throw new Error("Authorization denied fuck here is mistake")
    }

    const blk=await Blk.findOne({token})

    if(blk){
        throw new Error("Invalid not able to hack ....")
    }

    
    const verifyToken=await jwt.verify(token,process.env.secret)
    const {_id}=verifyToken;
    const user =await User.findById(_id);
    if(!user){
        throw new Error("User does not exists");
    }
    req.user=user
    next();
        
    } catch (error) {
        
       return res.json({error:error.message})
    }
}

module.exports=Auth