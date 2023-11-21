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

// TODO: Faire en sorte de créer des services où prisma ne sera utilisé que à cet endroit, et donc supprimer ce middleware car donner l'accès à prisma partout n'est pas une bonne idée