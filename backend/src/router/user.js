const express=require("express")
const userRouter=express.Router()

const {body}=require("express-validator")


const {userRegister,userLogin,userProfile,userLogout}=require("../controller/user")
const Auth = require("../middleware/auth")

userRouter.post("/register",[
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName".firstName).isLength({min:3}).withMessage("First name cannot be less than 3"),
    body("password").isLength({min:6}).withMessage("Password is too short")
],userRegister)

userRouter.post("/login",[
     body("email").isEmail().withMessage("Invalid Email + to long"),
     body("password").isLength({min:6}).withMessage("Password is too short")
],userLogin)

userRouter.get("/profile",Auth,userProfile);

userRouter.get("/logout",Auth,userLogout);



module.exports=userRouter




