import express from 'express'
import { } from './controllers/exercises.controller.js'

const exercisesRouter = express.Router();

// exercise calls
exercisesRouter.get('/get-exercise', () => { });

export default exercisesRouter;