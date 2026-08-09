import { Router } from "express";
import { createTask, getMyTasks, updateTask, deleteTask,getSingleTask,getTaskState} from "../controllers/task.controller.js";
import verifyjwt from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/create").post(verifyjwt, createTask)
router.route("/mytasks").get(verifyjwt, getMyTasks)
router.route("/stats").get(verifyjwt, getTaskState);
router.route("/task/:taskId").get(verifyjwt,getSingleTask)
router.route("/update/:taskId").patch(verifyjwt, updateTask)
router.route("/delete/:taskId").delete(verifyjwt, deleteTask)



export default router;