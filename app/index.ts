import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { prismaMiddleware } from './middlewares/prismaMiddleware';
import userRoutes from './routes/user';

dotenv.config();

// Faire des JWToken pour les utilisaterus authentifié et faire des JWTokens anonyme pour les utilisateurs non authentifié

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(prismaMiddleware);
app.use('/user', userRoutes);

app.get('/', async (req: Request, res: Response) => {
  res.send('Express + TypeScript Server + lol la voiture tu as compris mdr');
});

module.exports = app;