import { Router } from "express";
import { userRouter } from "./user/index.js";
import { blogRouter } from "./blog/index.js";
import { commRouter } from "./comment/index.js";
export const apiRoutes = Router();

//add all the api routes available 
apiRoutes.use("/user", userRouter)
apiRoutes.use("/blog", blogRouter);
apiRoutes.use("/comment", commRouter);