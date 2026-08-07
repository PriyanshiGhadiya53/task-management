import { asyncHandler } from "../utils/asynchandler.js";
import {ApiError} from "../utils/Apierror.js";
import {Apiresponse} from "../utils/apiresponse.js";
import {Task} from "../models/task.model.js";
import mongoose from "mongoose";

//req.body se lo
//validate krna hoga ki task name aur description hai ya nhi
//validation fail show an error
//JWT Middleware se req.user milega
//task create then owner field me req.user._id set krna hoga
//check if task is created or not
//return response
const createTask=asyncHandler(async(req,res)=>{
    const {title,description,dueDate}=req.body

    if(!title || !description){
        throw new Apierror(400,"Title and description are required")
    }

    const task=await Task.create(
        {
            title,
            description,
            dueDate,
            owner:req.user._id,
        }
    )
    if(!task){
        throw new Apierror(400,"Task not created")
    }
    return res.status(201)
    .json(
        new Apiresponse(201,"Task created successfully",task)
    )

})

//getmytask
// 1. Request aayi
// 2. User kaun hai? → req.user
// 3. User ki ID lo
// 4. owner se match karke Task.find()
// 5. Response bhej do

const getMyTasks = asyncHandler(async (req, res) => {

    const user_id = req.user._id;

    // Query object
    const query = {
        owner: user_id
    };

    // Search functionality
    const searchText = req.query.search;

    if (searchText) {
        query.$or = [
            {
                title: {
                    $regex: searchText,
                    $options: "i"
                }
            },
            {
                description: {
                    $regex: searchText,
                    $options: "i"
                }
            }
        ];
    }
  //filter by status
    const statusFilter = req.query.status;
    if(statusFilter)
    {
    
        query.status=statusFilter
    }

    //sort by dueDate
    const sortBy = req.query.sortBy;
    let sortOption = { createdAt: -1 }; // Default sorting by createdAt in descending order
    if (sortBy) {
    sortOption = sortBy;
    }

    //pagination

    const page=Number(req.query.page)||1
    const limit=Number(req.query.limit)||10
    const skip=(page-1)*limit//agar page 1 hai to skip 0, page 2 hai to skip 10, page 3 hai to skip 20
    if(page<1 || limit<1){
        throw new ApiError(400,"Invalid page or limit value")
    }
    const tasks = await Task.find(query).sort(sortOption).skip(skip).limit(limit);

    return res.status(200).json(
        new Apiresponse(
            200,
            "Tasks fetched successfully",
            tasks
        )
    );
});


//get single task
//req.params.id se task id lo
//task object id verification
//taskid se task find karo
//task nahi mila to error thrw karo
//return task

const getSingleTask=asyncHandler(async(req,res)=>{
    const {taskId} =req.params

    if(!mongoose.Types.ObjectId.isValid(taskId))
    {
        throw new ApiError(400,"Invalid task id")
    }

    const task=await Task.findOne({
         _id:taskId,
        owner:req.user._id
       
    })
    if(!task){
            throw new ApiError(404,"Task not found")
    }
    return res.status(200)
    .json(
        new Apiresponse(200,"Task fetched successfully",task)
    )

})

const getTaskState=asyncHandler(async(req,res)=>{
    const userId=req.user._id
    //total task count
    const [totalTaskCount,complitedTask,pendingTask]=await Promise.all([
        Task.countDocuments({owner:userId}),
        Task.countDocuments({owner:userId,status:"completed"}),
        Task.countDocuments({owner:userId,status:"pending"})
    ])
    return res.status(200)
    .json(
        new Apiresponse(200,"Task state fetched successfully",{
            totalTaskCount,
            complitedTask,
            pendingTask
        })
    )
})



//update task
//req.params se task id lo
//req.body se update data lo
//task id se task find kro
//task owner aur req.user._id match kro
//if match then update kro
//return response

        const updateTask=asyncHandler(async(req,res)=>{
            const taskId=req.params.taskId
        const {title,description,status,dueDate}=req.body

        const tasks=await Task.findById(taskId)

        if(!tasks)
        {
            throw new ApiError(404,"not found tasks")
        }
        if(tasks.owner.toString() !==req.user._id.toString()){
               throw new ApiError(403,"forbbiden tasks")
        }

        const updatedTask=await Task.findByIdAndUpdate(taskId,{
            title,
            description,
            status,
            dueDate,
        },{
            new:true,
            runValidators: true,
        })

        return res.status(200)
        .json(
            new Apiresponse(200,"Task updated successfully",updatedTask)
        )
        
        })

        //task delete
        //take a task request
        //find the task user
        //take a task id from params
        //find the task by id
        //match the owner of the task with req.user._id
        //if match then delete the task
        //return response

        const deleteTask=asyncHandler(async(req,res)=>{
            const user=req.user
            const taskId=req.params.taskId

            const task=await Task.findById(taskId)
            if(!task){
                throw new ApiError(404,"Task not found")
            }
            if(task.owner.toString() !==user._id.toString()){
                throw new ApiError(403,"Forbidden")
            }
            await Task.findByIdAndDelete(taskId)
            return res.status(200)
            .json(
                new Apiresponse(200,"Task deleted successfully",{})
            )
      
        })


export {createTask,getMyTasks,updateTask,deleteTask,getTaskState,getSingleTask}