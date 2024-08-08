import { Router } from 'express';
import { Blog } from '../../../models/blog.js'
import { User } from '../../../models/user.js';
import { Blog_Comment } from '../../../models/blog_comment.js'
import { getSessionVars } from '../../auth/util.js';
import { renderError } from '../../util.js';
export const homeRouter = Router();
const pageTitle = "Just Another Tech Blog"
/**
 * Provides the get path for the home page render
 */
homeRouter.get('/', async (req, res) => {
  try{
    let es = await Blog.findAll({
      include: {all: true, nested:true}
    });
    let entries = es.map(i=> i.get({plain: true}))
    // console.log(JSON.stringify(entries, null, 3))
    res.render('home', {entries, pageTitle, ...getSessionVars(req)});
  }catch(err){
    console.error(err);
    res.render("error", err)
  }
});

homeRouter.get("/comment/:id", async (req, res) => {
  let {uid, isLoggedIn } = getSessionVars(req); 
  if (uid && isLoggedIn) {
      try{
          let b = await Blog.findOne({
            where: {
              id: req.params.id
            }, 
            include: User
          });

          if(!b){
            res.render("error", {message: "unable to find the item requested"})
            return;
          }
          let blog = b.get({plain: true})
          console.log(JSON.stringify({uid, isLoggedIn, pageTitle, blog}))
        res.render("addcomment", {uid, isLoggedIn, pageTitle, blog})
        }catch(err){
          console.error(err)
          res.render("error", {message: JSON.stringify(err)});
        }
  }else{
    renderError(res, {error:"You must be logged in for this feature"})
  }
})