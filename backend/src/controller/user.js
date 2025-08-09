const userCreate = require("../service/userCreate")
const User = require("../models/user")
const { validationResult } = require("express-validator")


const userRegister = async (req, res) => {  
    

    try {

        
        const error = validationResult(req)

    if (!error.isEmpty) {
        throw new Error(error.array())
    }

    const { fullName, email, password } = req.body
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

module.exports = userRegister