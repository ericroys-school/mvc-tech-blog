import { Router } from 'express';

export const homeRouter = Router();

/**
 * Provides the get path for the home page render
 */
homeRouter.get('/', async (req, res) => {
  res.render('home');
});
