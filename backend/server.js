import express from 'express'
import { connect_mongo } from './config/mongo_connect.config.js'
import cors from 'cors'
import userRouter from './routes/user.routes.js'
import topRouter from './routes/top.routes.js'
import langRouter from './routes/lang.routes.js'
import exercisesRouter from './routes/exercises.routes.js'
import aiRouter from './routes/ai.routes.js'

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// user calls
app.use('/api/user', userRouter);
// top calls
app.use('/api/top', topRouter);
// language calls
app.use('/api/lang', langRouter);
// exercise calls
app.use('/api/exercise', exercisesRouter);
// ai call
app.use('/api/ai', aiRouter);

app.listen(port, () => {
    connect_mongo();

    if (port === 5000)
        console.log(`Server started at http://localhost:${port}`);
    else
        console.log(`Server started at port: ${port}`);
});