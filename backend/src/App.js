import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.router.js";
import taskRouter from "./routes/task.router.js";


const app=express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN , // Fallback frontend URL
    credentials: true,
  })
);//middleware ya config setting karani hai tab app.use karate hai 
//ish step pe configuration ho raha hai
app.use(express.json({limit:"20kb"}));
app.use(express.urlencoded({limit:"20kb",extended:true}))
app.use(express.static("public"));
app.use(cookieParser())//cookieparser config

app.use("/api/v1/user",userRouter)
app.use("/api/v1/task",taskRouter)




export default app;