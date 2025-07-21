import express from 'express'
import { getLang } from '../controllers/languges.controller.js'

const langRouter = express.Router();

// language calls
langRouter.post('/get-lang', getLang);

export default langRouter;