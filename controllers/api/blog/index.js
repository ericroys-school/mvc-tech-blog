import { Router } from 'express';
import { Blog } from '../../../models/blog.js';
import {
  responseError,
  responseUnauthorized,
  responseUserError,
} from '../util.js';

export const blogRouter = Router();

blogRouter.post('/', async (req, res) => {
  if (!req.session || !req.session.isLoggedIn || !req.session.uid) {
    responseUnauthorized(res);
    return;
  }
  if (!req.body) responseUserError(res, 'No body provided');
  let { title, content } = req.body;
  try {
    let a = await Blog.create({
      title: title,
      text: content,
      user_id: req.session.uid,
    });
    res.status(201).json(a.get({ plain: true }));
  } catch (err) {
    console.error(err);
    responseError(res, err);
  }
});
