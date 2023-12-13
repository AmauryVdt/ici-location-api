import express from 'express';
import * as webhookController from '../controllers/webhook';
import { body, check } from 'express-validator';

const router = express.Router();

router.post(
    '/user',
    // check('svix-id').notEmpty(),
    // check('timestamp').notEmpty(),
    // check('svix-signature').notEmpty(),
    webhookController.webhook
);

export default router;