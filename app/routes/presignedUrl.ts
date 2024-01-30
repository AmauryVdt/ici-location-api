import express from 'express';
import * as presignedUrl from '../controllers/presignedUrl';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';

const router = express.Router();

router.get('/', 
    ClerkExpressWithAuth(),
    presignedUrl.presignedUrl
);

export default router;