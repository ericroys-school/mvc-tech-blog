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
    responseError(res, JSON.stringify(err))
  }
})

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
    responseError(res, JSON.stringify(err))
  }
})