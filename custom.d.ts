import { PrismaClient } from '@prisma/client';
import { LooseAuthProp } from '@clerk/clerk-sdk-node';

declare module 'express-serve-static-core' {
  interface Request {
    prisma: PrismaClient;
  }
}

declare global {
  namespace Express {
    interface Request extends LooseAuthProp {}
  }
}