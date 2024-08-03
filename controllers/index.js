import { Router } from 'express';
import { apiRoutes } from './api/index.js';
import { uiRoutes } from './ui/index.js';

/**Define the routing from the top of the route tree */
const router = Router();
//import and make all the ui routes use path /
router.use('/', uiRoutes);
//import and make all the api routes use path /api
router.use('/api', apiRoutes);

export { router };
