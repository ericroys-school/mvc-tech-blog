import { Router } from "express";
export const loginRouter = Router();

/**
 * Provides the get path for the login render
 */
loginRouter.get("/", async (req, res)=> {
    res.render("login")
})