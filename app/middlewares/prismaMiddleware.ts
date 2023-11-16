import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

export const prisma = new PrismaClient();

export function prismaMiddleware(req: Request, res: Response, next: NextFunction) {
  req.prisma = prisma;

  res.on('finish', async () => {
    await req.prisma.$disconnect();
  });

  next();
}