const http=require("http")
const app=require("./app")

require('dotenv').config()
const server=http.createServer(app)

const port=process.env.PORT



const connectDB=require("./db/db")


const startTurbo=async()=>{
        await connectDB()
        console.log("Connected to server");
        
        server.listen(5001,()=>console.log(`${5001}`))
}

startTurbo()