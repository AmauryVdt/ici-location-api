import express from 'express';
import { body, validationResult } from 'express-validator';
import * as userController from '../controllers/propertie';

const router = express.Router();

// Route pour obtenir la liste des utilisateurs
router.get('/', userController.getAllProperties);

// Route pour créer un nouvel utilisateur
router.post('/', body('price').isNumeric().trim(), userController.createPropertie);

// Route pour obtenir un utilisateur spécifique par son ID
router.get('/:id', userController.getPropertieById);

// Route pour mettre à jour un utilisateur
router.put('/:id', userController.udpatePropertie);

// Route pour supprimer un utilisateur
router.delete('/:id', userController.deletePropertie);

export default router;