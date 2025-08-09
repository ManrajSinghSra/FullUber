const User=require("../models/user")

const userCreate=async ({firstName,lastName,email,password})=>{    
    const newUser=User.create({
        fullName:{
            firstName,lastName
        },
        email,
        password
    })
    return newUser
}

module.exports=userCreate