import * as dotenv from 'dotenv'
import express, {Express, Request, Response, NextFunction} from 'express'
import cors from 'cors'
import helmet from 'helmet'
import logger from "morgan";

import validateEnv from "@utils/validateEnv";
import authRouter from './routes/api/auth'

dotenv.config();
validateEnv();

const app:Express = express()

// Configure logging based on environment
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));

app.use(helmet());
app.use(cors());
app.use(express.json())
app.use(express.static('public'));

app.use('/api/auth',authRouter)
app.set('json space', 8);

app.get('/api/auth/users/signup', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
});
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const { status = 500, message = 'Server error' } = err;
    res.status(status).json({ message });
});

// @ts-ignore
module.exports = app