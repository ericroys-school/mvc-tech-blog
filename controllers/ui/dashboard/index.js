import { Router } from "express";
import { Blog } from "../../../models/blog.js";
import { getSessionVars, requireAuth } from "../../auth/util.js"
import { User } from "../../../models/user.js";
import { Blog_Comment } from "../../../models/blog_comment.js";
import { responseNotFound } from "../../api/util.js";

export const dashRouter = Router();
const pageTitle = "Dashboard"

/** route for the dashboard
 *  If logged in then paint the dashboard otherwise
 *  direct to error
 */
dashRouter.get("/", async (req, res) => {
    let {uid, isLoggedIn } = getSessionVars(req); 
    if (uid && isLoggedIn) {
        try{
            let u = await Blog.findAll({
              where: {
                user_id: req.session.uid
              }, 
              include: [User]
            })
            let entries = u.map(i=> i.get({plain:true}));
            /* pass through the sql result, page title and session vars */
            res.render("dashboard", {entries, pageTitle, uid, isLoggedIn});
          }catch(err){
            console.error(err)
            res.render("error", err)
          }
    }else{
        res.render("error", {message:"You must be logged in to see the dashboard"})
    }
})

/**
 * route for creating blog (dashboard view)
 * Again, if logged in, paint the create view otherwise
 * paint the error
 */
dashRouter.get("/create", async (req, res) => {
  let {uid, isLoggedIn } = getSessionVars(req); 
  if (uid && isLoggedIn) {
      try{
          res.render("addblog", {pageTitle, uid, isLoggedIn});
        }catch(err){
          console.error(err)
          res.render("error", err)
        }
  }else{
      res.render("error", {message:"You must be logged in to add a new blog entry"})
  }
})

/**
 * route to view a single blog entry (for update)
 * Again, if logged in paint it otherwise error
 */
dashRouter.get("/:id", async (req, res) => {
  let {uid, isLoggedIn } = getSessionVars(req); 
  if (uid && isLoggedIn) {
      try{
          let b = await Blog.findOne({
            where: {
              id: req.params.id
            }
          });

          if(!b){
            res.render("error", {message: "unable to find the item requested"})
            return;
          }
          let blog = b.get({plain: true})
        res.render("editblog", {uid, isLoggedIn, pageTitle, blog})
        }catch(err){
          console.error(err)
          res.render("error", {message: JSON.stringify(err)});
        }
  }else{
      res.render("error", {message:"You must be logged in to add a new blog entry"})
  }
})

