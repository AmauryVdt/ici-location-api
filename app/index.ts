import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import { prismaMiddleware } from './middlewares/prismaMiddleware';
import userRoutes from './routes/user';
import webhookRoutes from './routes/webhook';
import presignedUrl from './routes/presignedUrl';
import property from './routes/property';

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(prismaMiddleware);
app.use('/user', userRoutes);
app.use('/webhook', webhookRoutes);
app.use('/presigned-url', presignedUrl);
app.use('/property', property);

app.get('/', async (req: Request, res: Response) => {
  res.send('Express + TypeScript Server + lol la voiture tu as compris ?');
});

module.exports = app;