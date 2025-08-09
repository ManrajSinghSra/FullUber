const express=require("express")
const userRouter=express.Router()

const {body}=require("express-validator")


const userController=require("../controller/user")

userRouter.post("/register",[
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName".firstName).isLength({min:3}).withMessage("First name cannot be less than 3"),
    body("password").isLength({min:6}).withMessage("Password is too short")
],userController)

module.exports=userRouter