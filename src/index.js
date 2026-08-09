import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./App.js";
dotenv.config({
  path: "./.env",   
});


connectDB()
.then(()=>{
  app.listen(process.env.PORT||3000,()=>{
    
    console.log(`server run at ${process.env.PORT}`)
  })
})
.catch((err)=>{
  console.log("MONGO DB connection failed!!!",err)
})

