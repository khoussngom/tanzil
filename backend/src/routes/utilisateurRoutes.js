const express = require('express');
const router = express.Router();
const UtilisateurController = require('../controllers/UtilisateurController');
const { body } = require('express-validator');

// Middleware d'authentification (à créer)
const { authentifier } = require('../middleware/auth');

// Routes publiques
router.post('/inscrire', [
  body('nom').notEmpty().withMessage('Le nom est requis'),
  body('email').isEmail().withMessage('Email invalide'),
  body('mot_de_passe').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères')
], UtilisateurController.inscrire);

router.post('/connecter', [
  body('email').isEmail().withMessage('Email invalide'),
  body('mot_de_passe').notEmpty().withMessage('Le mot de passe est requis')
], UtilisateurController.connecter);

// Routes protégées
router.get('/profil/:id', authentifier, UtilisateurController.obtenirProfil);
router.put('/profil/:id', authentifier, [
  body('nom').optional().notEmpty().withMessage('Le nom ne peut pas être vide'),
  body('email').optional().isEmail().withMessage('Email invalide'),
  body('mot_de_passe').optional().isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères')
], UtilisateurController.mettreAJourProfil);

// Routes admin
router.get('/', authentifier, UtilisateurController.lister);
router.delete('/:id', authentifier, UtilisateurController.supprimer);

module.exports = router;