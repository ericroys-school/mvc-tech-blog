import { Router } from 'express';
import { Blog_Comment } from '../../../models/blog_comment.js';
import { responseError, responseUserError, responseUnauthorized } from '../util.js';
export const commRouter = Router();

/**
 * Add a comment if logged in otherwise error
 */
commRouter.post('/', async (req, res) => {
  if (!req.session || !req.session.isLoggedIn || !req.session.uid) {
    responseUnauthorized(res);
    return;
  }
  if (!req.body) responseUserError(res, 'No body provided');
  let { blog_id, content } = req.body;
  // console.log(JSON.stringify(req.body))
  try {
    let a = await Blog_Comment.create({
      user_id: req.session.uid,
      comment: content,
      blog_id: blog_id,
    });
    res.status(201).json(a.get({ plain: true }));
  } catch (err) {
    console.error(err);
    responseError(res, err.message || err);
  }
});
