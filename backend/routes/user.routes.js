import express from 'express'
import { signUp, signIn, upUser, delUser, getSecret, ansComp } from '../controllers/user.controller.js'

const userRouter = express.Router();

// user calls
userRouter.post('/sign-up', signUp);
userRouter.post('/sign-in', signIn);
userRouter.post('/update', upUser);
userRouter.post('/delete', delUser);
userRouter.post('/secret', getSecret);
userRouter.post('/ans-rep', ansComp);


export default userRouter;

