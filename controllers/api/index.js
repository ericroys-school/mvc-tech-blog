import { Router } from "express";
import { userRouter } from "./user/index.js";
import { blogRouter } from "./blog/index.js";
export const apiRoutes = Router();

apiRoutes.use("/user", userRouter)
apiRoutes.use("/blog", blogRouter);