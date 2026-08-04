import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken"


const verifyjwt=asyncHandler(async(req,res,next)=>{
       try {
        const token=req.cookies?.accessToken ||req.header("Authorization")?.replace("Bearer ","")
        if(!token){
         throw new ApiError(401,"unauthorization")
        }
 
        const decodedtoken= jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
 
        const user=await User.findById(decodedtoken?.id).select("-password -refreshToken")
        if(!user){
             throw new ApiError(401,"Invalied accesstoken");  
           }
           req.user=user;
           next()
       } catch (error) {
         throw new ApiError(401,error?.message || "Invalid access token")
       }
})

export default verifyjwt