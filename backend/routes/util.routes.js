import express from 'express'
import { ping } from '../controllers/util.controller.js'

const utilRouter = express.Router();

utilRouter.get('/ping', ping);

export default utilRouter;