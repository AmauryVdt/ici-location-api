import { PrismaClient } from '@prisma/client';

declare module 'express-serve-static-core' {
  interface Request {
    prisma: PrismaClient;
  }
}