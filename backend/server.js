import express from 'express'
import { connect_mongo } from './config/mongo_connect.config.js'

const app = express();
const server_port = 5000;

app.use(express.json());

app.listen(server_port, () => {
    connect_mongo();
    
    console.log("Server started at http://localhost:5000");
});