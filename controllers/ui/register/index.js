import { Router } from "express";
export const registerRouter = Router();

/**
 * Provides the get path for the registration page
 */
registerRouter.get("/", async (req, res)=> {
    res.render("signup")
})