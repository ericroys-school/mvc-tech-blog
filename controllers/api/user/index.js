import { Router } from "express";
import { User } from "../../../models/user.js";
import {
    responseError,
    responseNotFound,
    responseUnauthorized,
    responseUserError,
  } from "../../util.js";
  export const userRouter = Router();

/**
 * Create a new user
 */
userRouter.post("/", async (req, res) => {
    if (!req.body) responseUserError(res, "No body provided");
    let { username, password } = req.body;
  
    try {
      const u = await User.create({
        username: username,
        password: password,
      });
      res.status(201).json(u);
    } catch (err) {
      console.error(err);
      err.errors && err.errors.length > 0
        ? responseUserError(res, err.errors[0].message)
        : responseError(res, err.message || err);
    }
  });
  
  userRouter.post("/login", async (req, res) => {
    if (!req.body) responseUserError(res, "No body provided");
    let { username, password } = req.body;
    if (!username) responseUserError(res, "No username provided");
    try {
      let u = await User.findOne({
        where: { username: username },
        attributes: ["password", "username", "id"],
      });
      if (!u) {
        responseUnauthorized(res);
        return;
      }
      let isv = await u.isValidPassword(password);
      if (!isv) {
        responseUnauthorized(res);
        return;
      } else {
  
        req.session.save(() => {
          req.session.isLoggedIn = true;
          req.session.uid =  u.getDataValue("id")
          res.status(200).json({ message: "login accepted" });
        });
      }
    } catch (err) {
      console.error(err)
      responseError(res, err.message || err);
    }
  });
  