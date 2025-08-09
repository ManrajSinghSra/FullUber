const userCreate = require("../service/userCreate")
const User = require("../models/user")

const Blk=require("../models/blacklist")
const { validationResult } = require("express-validator")


const userRegister = async (req, res) => {  
    try {
        const error = validationResult(req)

    if (!error.isEmpty) {
        throw new Error(error.array())
    }

    const { fullName, email, password } = req.body

    if(fullName.firstName.length>=30 || fullName.lastName.length>=30 || email.length>=30){
        throw new Error("Data is not Valid")
    }
    const find=await User.findOne({email})

    if(find){
        throw new Error("User already Exists");
    }
    const hashPassword = await User.bcryptPassword(password)

    const user = await userCreate({ firstName: fullName?.firstName, lastName: fullName?.lastName, email, password: hashPassword })

    const token = user.getToken()
    res.send(user)
        
    } catch (error) {
        res.status(400).json(error.message)
    }
}
const userLogin=async(req,res)=>{

    try {
 
        const error=validationResult(req);
        if(!error.isEmpty){
            throw new Error(error.array())
        }

        const {email,password}=req.body

        if(email.length>=30){
            throw new Error("Email is too long...")
        }

        const find=await User.findOne({email}).select("+password")
        if(!find){
            throw new Error("Invalid Credentials")
        } 

        const isValidPassword=await find.comparePassword(password)

        if(!isValidPassword){
            throw new Error("Invalid Credentials")
        }

        const token=await find.getToken()

        res.cookie("token",token,{expires:new Date(Date.now()+8*3600000)})
        res.json({data:find})
        
    } catch (error) {
        
        res.status(401).json(error.message)

    }
}

const userProfile=async(req,res)=>{
    try {
        

    return res.json({data:req.user});
    } catch (error) {
        
        console.log("THis is profile error ");
        
       res.json({error:error.message})
    }
}

const userLogout=async(req,res)=>{

   try {
     const {token}=req.cookies

    await Blk.create({token})

    res.clearCookie("token")

    res.json({message:"OK"})
   } catch (error) {
    res.json({error:error.message})
   }

}

module.exports = {userRegister,userLogin,userProfile,userLogout}