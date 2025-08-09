start backend then express and app.js 
here make app then server is maked on http 
here it is used dotenv + cors  chnage main file to server from app

next mongoose and connect to mongoose  models users fullName and email and password + socketId for track driver and caption   and bcrypt and jsonwebtoken

//!select field is there which when invoked or called  when find a user { select:false}

make token in schema  like from the id + compare password + statics.hashpassword  

controllers  + router to register users 

express-validator  {body}  

router of /register  it is used as  [
    body('email').isEmail().withMessage("Invalid email"),
    body("password").isLength({min:6}).w....
]

then controller and in service folder make a service of make a user 

    in controller require the service and in router we make a validator so make use of it 
    {validationResult} =require("express-validator") 
    error from validationResult(req)


