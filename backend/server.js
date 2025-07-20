import express from 'express'
import { connect_mongo } from './config/mongo_connect.config.js'
import cors from 'cors'
import userRouter from './routes/user.routes.js'
import topRouter from './routes/top.routes.js'
import langRouter from './routes/lang.routes.js'
import exercisesRouter from './routes/exercises.routes.js'

const app = express();
const server_port = 5000;

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

app.listen(server_port, () => {
    connect_mongo();

    console.log("Server started at http://localhost:5000");
});