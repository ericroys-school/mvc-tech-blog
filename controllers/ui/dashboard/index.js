import { Router } from "express";
import { Blog } from "../../../models/blog.js";
import { getSessionVars, requireAuth } from "../../auth/util.js"
import { User } from "../../../models/user.js";
import { Blog_Comment } from "../../../models/blog_comment.js";

export const dashRouter = Router();

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
            res.render("dashboard", {entries, ...getSessionVars(req)});
          }catch(err){
            console.error(err)
            res.render("error", err)
          }
    }else{
        res.render("error", {message:"You must be logged in to see the dashboard"})
    }
})