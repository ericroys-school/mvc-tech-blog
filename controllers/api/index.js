import { Router } from "express";
import { userRouter } from "./user/index.js";
export const apiRoutes = Router();

apiRoutes.use("/user", userRouter)