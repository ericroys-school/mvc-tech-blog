import { Router } from 'express';
import { Blog } from '../../../models/blog.js'
import { User } from '../../../models/user.js';
import { Blog_Comment } from '../../../models/blog_comment.js'
import { getSessionVars } from '../../auth/util.js';
export const homeRouter = Router();

/**
 * Provides the get path for the home page render
 */
homeRouter.get('/', async (req, res) => {
  try{
    let es = await Blog.findAll({
      include: [Blog_Comment, User]
    });
    let entries = es.map(i=> i.get({plain: true}))
    // console.log(JSON.stringify(entries, null, 3))
    res.render('home', {entries, ...getSessionVars(req)});
  }catch(err){
    console.error(err);
    res.render("error", err)
  }
});
