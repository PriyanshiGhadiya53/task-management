import mongoose from "mongoose";
import dotenv from "dotenv";
import {db} from "../constant.js";



 const connectDB=async()=>{
    try {
        const connection=await mongoose.connect(`${process.env.MONGODB_URL}/${db}`);
        console.log(`mongodb connected !!`);
    } catch (error) {
        console.log("Error",error)
        process.exit(1)
    }
}

export default connectDB

