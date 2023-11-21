import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/error';
import { CustomRequest } from '../middlewares/authMiddleware';
import { hash, compareSync } from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import 'dotenv/config'

const saltRounds: number = 8;

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
        const user = await req.prisma.user.findUnique({
            where: {
              email: email,
            }
        });
        if (!user) {
            return res.status(401).json('Invalid credentials');
        }
        const isMatch = await compareSync(password, user.password);
        if (!isMatch) {
            return res.status(401).json('Invalid credentials');
        }
        const jwtAccessSecret = process.env.JWT_ACCESS_SECRET;
        if (!jwtAccessSecret) {
          throw new Error("JWT_ACCESS_SECRET is not defined in the environment variables");
        }
        const secret: Secret = jwtAccessSecret;
        const token = jwt.sign({ _id: user.id?.toString(), name: user.email }, secret, {
            expiresIn: '2 days',
          });
        res.status(200).json({ user: user, token: token });
    } catch (error: any) {
        res.status(500).send(getErrorMessage(error));
    }
}

export async function register(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await req.prisma.user.create({
        data: {
          email: email,
          password: await hash(password, 8),
        }
      });
      res.status(201).json(user);
    } catch (error: any) {
      res.status(500).send(getErrorMessage(error));
    }
  }

// export async function refreshtoken(req: Request, res: Response) {
//     try {
//         res.status(200).json('login');
//     } catch (error: any) {
//         res.status(500).send(error.message);
//     }
// }
