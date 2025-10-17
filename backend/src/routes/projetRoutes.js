const express = require('express');
const router = express.Router();
const ProjetController = require('../controllers/ProjetController');
const { body } = require('express-validator');
const { authentifier } = require('../middleware/auth');

router.get('/', ProjetController.lister);
router.get('/realises', ProjetController.realisés);
router.get('/en-cours', ProjetController.enCours);
router.get('/statistiques', ProjetController.statistiques);
router.get('/:id', ProjetController.obtenirParId);

router.post('/', authentifier, [
  body('titre').notEmpty().withMessage('Le titre est requis'),
  body('description').notEmpty().withMessage('La description est requise'),
  body('statut').isIn(['en_cours', 'realise', 'annule']).withMessage('Statut invalide'),
  body('budget').isNumeric().withMessage('Le budget doit être un nombre')
], ProjetController.creer);

router.put('/:id', authentifier, [
  body('titre').optional().notEmpty().withMessage('Le titre ne peut pas être vide'),
  body('description').optional().notEmpty().withMessage('La description ne peut pas être vide'),
  body('statut').optional().isIn(['en_cours', 'realise', 'annule']).withMessage('Statut invalide'),
  body('budget').optional().isNumeric().withMessage('Le budget doit être un nombre')
], ProjetController.mettreAJour);

router.delete('/:id', authentifier, ProjetController.supprimer);

module.exports = router;