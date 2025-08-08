import express from 'express'
import { connect_mongo } from './config/mongo_connect.config.js'
import cors from 'cors'
import userRouter from './routes/user.routes.js'
import topRouter from './routes/top.routes.js'
import langRouter from './routes/lang.routes.js'
import exercisesRouter from './routes/exercises.routes.js'
import aiRouter from './routes/ai.routes.js'
import utilRouter from './routes/util.routes.js'

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: [
        `http://localhost:5173`,
        'https://learn-math-now.netlify.app',
    ],
    credentials: true
}));
app.use(express.json());

// user calls
app.use('/api/user', userRouter);
// top calls
app.use('/api/top', topRouter);
// language calls
app.use('/api/lang', langRouter);
// exercise calls
app.use('/api/exercise', exercisesRouter);
// ai calls
app.use('/api/ai', aiRouter);
// utilities calls
app.use('/api/util', utilRouter);

app.listen(port, () => {
    connect_mongo();

    if (port === 5000)
        console.log(`Server started at http://localhost:${port}`);
    else
        console.log(`Server started at port: ${port}`);
});