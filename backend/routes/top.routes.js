import express from 'express'
import { signToTop, deleteFromTop, getTop } from '../controllers/top.controller.js'

const topRouter = express.Router();

// top calls
topRouter.post('/sign-up', signToTop);
topRouter.post('/remove', deleteFromTop);
topRouter.post('/get', getTop);

export default topRouter;