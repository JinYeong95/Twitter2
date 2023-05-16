import express from "express"; // 터미널에 npm i express
import cors from "cors"; // npm i cors
import morgan from "morgan";  // npm i morgan
import tweetsRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";
import { config } from "./config.js";
import { initSocket } from "./connection/socket.js";
import { connectDB } from "./db/database.js";
// import {db} from "./db/database.js";


const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny')); // 사용자들이 들어오면 콘솔에 찍어줌

app.use('/tweets', tweetsRouter);
app.use('/auth', authRouter);

app.use((req,res) => {
    res.sendStatus(404);
});

app.use((error, req, res, next) => {
    console.log(error);
    res.sendStatus(500);
});

connectDB().then(() => {
    console.log('init');
    const server = app.listen(config.host.port);
    initSocket(server);
}).catch(console.error);
