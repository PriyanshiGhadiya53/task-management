import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
    },
    status:{
        type:String,
        enum:["pending","inprogress","completed"],
        default:"pending"
    },
    dueDate:{
        type:Date,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
},{timestamps:true})

export const Task=mongoose.model("Task",taskSchema)