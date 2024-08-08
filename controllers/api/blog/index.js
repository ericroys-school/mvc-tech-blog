import { Router } from 'express';
import { Blog } from '../../../models/blog.js';
import {
  responseError,
  responseUnauthorized,
  responseUserError,
} from '../util.js';

export const blogRouter = Router();

/**
 * Create a blog if logged in or error if not
 */
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
    console.error(err.message);
    responseError(res, err.message || err);
  }
});

/**
 * Update an existing blog if logged in otherwise error
 */
blogRouter.put("/:id", async (req, res)=> {
  if (!req.session || !req.session.isLoggedIn || !req.session.uid) {
    responseUnauthorized(res);
    return;
  }
  if (!req.body) responseUserError(res, 'No body provided');
  let { title, content } = req.body;

  try{
    let blog = await Blog.update(
      {title:title, text:content},{
      where: {
        id: req.params.id
      }
    });
    res.status(200).json();
  }catch(err){
    console.error(err);
    responseError(res, err.message || err)
  }
})

/**
 * Delete an existing blog if logged in otherwise error
 */
blogRouter.delete("/:id", async (req, res)=> {
  if (!req.session || !req.session.isLoggedIn || !req.session.uid) {
    responseUnauthorized(res);
    return;
  }
  try{
    let exists = await Blog.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json()

  }catch(err){
    console.error(err);
    responseError(res, err.message || err)
  }
})