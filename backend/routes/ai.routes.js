import express from 'express'
import { askAI } from '../controllers/ai.controller.js'

const aiRouter = express.Router();

aiRouter.post('/ask', askAI);

export default aiRouter;