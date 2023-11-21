import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export interface CustomRequest extends Request {
 token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
 try {
   const token = req.header('Authorization')?.replace('Bearer ', '');
   const jwtAccessSecret = process.env.JWT_ACCESS_SECRET;
   if (!jwtAccessSecret) {
     throw new Error("JWT_ACCESS_SECRET is not defined in the environment variables");
   }
   const secret: Secret = jwtAccessSecret;

   if (!token) {
     throw new Error();
   }

   const decoded = jwt.verify(token, secret);
   (req as CustomRequest).token = decoded;

   next();
 } catch (err) {
   res.status(401).send('Please authenticate');
 }
};