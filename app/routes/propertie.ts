import express from 'express';
import { body, validationResult } from 'express-validator';
import * as propertieController from '../controllers/propertie';
import {
    ClerkExpressWithAuth,
    LooseAuthProp,
    WithAuthProp,
  } from '@clerk/clerk-sdk-node';
import { auth } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', ClerkExpressWithAuth(), propertieController.getAllProperties);

router.post(
    '/', 
    body('price').isNumeric().trim(), 
    propertieController.createPropertie
);

router.get('/:id', propertieController.getPropertieById);

router.put('/:id', propertieController.udpatePropertie);

router.delete('/:id', propertieController.deletePropertie);

export default router;