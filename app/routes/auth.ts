import express from 'express';
import * as authController from '../controllers/auth';
import { body, check } from 'express-validator';

const router = express.Router();

router.post(
    '/login',
    body('email').isEmail().normalizeEmail(), 
    body('password').trim().isLength({min: 8}),
    authController.login
);

router.post(
    '/register',
    body('email').isEmail().normalizeEmail(), 
    body('password').trim().isLength({min: 8}),
    authController.register
);

export default router;