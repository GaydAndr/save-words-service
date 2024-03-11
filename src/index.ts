import * as dotenv from 'dotenv'
import express,{ Express, Request, Response , Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'

import validateEnv from "@utils/validateEnv";

dotenv.config();
validateEnv();

const app:Express = express()

app.use(helmet());
app.use(cors());
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
});
app.get('/test', (req: Request, res: Response) => {
    res.send('Працює мляяять');
});

// @ts-ignore
module.exports = app