import express from 'express'
import { exerciseGen } from '../controllers/exercises.controller.js'

const exercisesRouter = express.Router();

// exercise calls
exercisesRouter.post('/get-exercise', exerciseGen);

export default exercisesRouter;