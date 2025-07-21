import express from 'express'
import { signUp, signIn, upUser, delUser } from '../controllers/user.controller.js'

const userRouter = express.Router();

// user calls
userRouter.post('/sign-up', signUp);
userRouter.post('/sign-in', signIn);
userRouter.post('/update', upUser);
userRouter.post('/delete', delUser);


export default userRouter;

