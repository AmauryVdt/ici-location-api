import express from 'express';
import * as userController from '../controllers/user';
import { body, check } from 'express-validator';

const router = express.Router();

// Route pour obtenir la liste des utilisateurs
router.get('/', userController.getAllUsers);

// Route pour créer un nouvel utilisateur
router.post(
    '/',
    body('email').isEmail().normalizeEmail(), 
    body('password').trim().isLength({min: 8}),
    body('username').trim().isLength({min: 3}),
    body('firstName').trim().isLength({min: 3}),
    body('lastName').trim().isLength({min: 3}),
    body('phone').trim().isLength({min: 10}),
    body('identity').isBoolean(),
    userController.createUser
);

// Route pour obtenir un utilisateur spécifique par son ID
router.get('/:id', userController.getUserById);

// Route pour mettre à jour un utilisateur
router.put('/:id', userController.updateUser);

// Route pour supprimer un utilisateur
router.delete('/:id', userController.deleteUser);

export default router;
