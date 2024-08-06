import { Router } from "express";
import { Blog } from "../../../models/blog.js";
import { getSessionVars, requireAuth } from "../../auth/util.js"
import { User } from "../../../models/user.js";
import { Blog_Comment } from "../../../models/blog_comment.js";
import { responseNotFound } from "../../api/util.js";

export const dashRouter = Router();
const pageTitle = "Dashboard"

dashRouter.get("/", async (req, res) => {
    let {uid, isLoggedIn } = getSessionVars(req); 
    if (uid && isLoggedIn) {
        try{
            let u = await Blog.findAll({
              where: {
                user_id: req.session.uid
              }, 
              include: [User, Blog_Comment]
            })
            let entries = u.map(i=> i.get({plain:true}));
            console.log(JSON.stringify(entries, null, 3))
            res.render("dashboard", {entries, pageTitle, ...getSessionVars(req)});
          }catch(err){
            console.error(err)
            res.render("error", err)
          }
    }else{
        res.render("error", {message:"You must be logged in to see the dashboard"})
    }
})

dashRouter.get("/create", async (req, res) => {
  let {uid, isLoggedIn } = getSessionVars(req); 
  if (uid && isLoggedIn) {
      try{
          res.render("addblog", {pageTitle, ...getSessionVars(req)});
        }catch(err){
          console.error(err)
          res.render("error", err)
        }
  }else{
      res.render("error", {message:"You must be logged in to add a new blog entry"})
  }
})

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
          console.log(JSON.stringify({uid, isLoggedIn, pageTitle, blog}))
        res.render("editblog", {uid, isLoggedIn, pageTitle, blog})
        }catch(err){
          console.error(err)
          res.render("error", {message: JSON.stringify(err)});
        }
  }else{
      res.render("error", {message:"You must be logged in to add a new blog entry"})
  }
})