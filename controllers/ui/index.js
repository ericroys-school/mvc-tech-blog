import { Router } from "express";
import { loginRouter } from "./login/index.js";
import { homeRouter } from "./home/index.js";
import { registerRouter } from "./register/index.js";
import { dashRouter } from "./dashboard/index.js";

/** this is the pathing for ui routes 
 *  which all start at the root /
 *  (i.e. http://server:port/<path defined below>)
*/
export const uiRoutes = Router();
// path for login
uiRoutes.use("/login", loginRouter);
// path for home page
uiRoutes.use("/home", homeRouter);
// point the root at the home page too
uiRoutes.use("/", homeRouter);
// path for registration
uiRoutes.use("/register", registerRouter);
// path for dashboard
uiRoutes.use("/dashboard", dashRouter);