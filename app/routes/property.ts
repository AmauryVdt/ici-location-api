import express from 'express';
import { body, param, query } from 'express-validator';
import * as propertieController from '../controllers/property';
import {
    ClerkExpressWithAuth,
    LooseAuthProp,
    WithAuthProp,
  } from '@clerk/clerk-sdk-node';

const router = express.Router();

router.get('/', propertieController.getAllProperties);

router.post(
    '/',
    ClerkExpressWithAuth(),
    body('type').isString().trim().isIn(['house', 'apartment', 'land', 'parking', 'other']),
    body('title').isString().trim(),
    body('description').isString().trim(),
    body('energyClass').isString().trim().isIn(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'Aucun']),
    body('ges').isString().trim().isIn(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'Aucun']),
    body('price').trim().toInt(),
    body('address').isString().trim(),
    body('images').isArray(/*{ min: 5 */).trim(),
    body('images.*').isString().isURL().trim(),
    body('totalArea').trim().toInt().optional(),
    body('livingArea').trim().toInt().optional(),
    body('rooms').trim().toInt().optional(),
    body('floor').trim().toInt().optional(),
    body('floorsNumber').trim().toInt().optional(),
    body('lift').toBoolean().optional(),
    body('furnished').toBoolean().optional(),
    body('balcony').toBoolean().optional(),
    body('terrace').toBoolean().optional(),
    body('garden').toBoolean().optional(),
    body('parking').trim().toInt().optional(),
    propertieController.createPropertie
);

router.get(
  '/user',
  ClerkExpressWithAuth(),
  propertieController.getPropertieByUserId
  );

router.get('/:id', propertieController.getPropertieById);

router.put('/:id', propertieController.udpatePropertie);

router.delete(
  '/:id',
  ClerkExpressWithAuth(),
  param('id').isString().trim().isUUID(),
  propertieController.deletePropertie
  );

export default router;