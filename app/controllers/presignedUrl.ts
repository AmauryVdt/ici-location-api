import { Request, Response } from 'express';
import createPresignedUrl from '../services/presignedUrl';
import {v4 as uuidv4} from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

export const presignedUrl = async (req: Request, res: Response) => {
    const auth = req.auth;
    const filename = uuidv4();
    const bucket = process.env.AWS_BUCKET;

    if (!auth.userId) {
      res.status(401).send('Unauthorized');
      return;
    }

    if (!bucket) {
      res.status(400).send('The parameter fileId is missing');
      return;
    }
  
    try {
      const url = await createPresignedUrl(bucket, `uploads/${filename}`);
      res.status(201).json({ url });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de la génération de l’URL pré-signée');
    }
  };