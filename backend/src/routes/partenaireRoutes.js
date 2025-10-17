const express = require('express');
const router = express.Router();
const PartenaireController = require('../controllers/PartenaireController');
const { body } = require('express-validator');
const { authentifier } = require('../middleware/auth');

router.get('/', PartenaireController.lister);
router.get('/actifs', PartenaireController.actifs);
router.get('/:id', PartenaireController.obtenirParId);

router.post('/', authentifier, [
  body('nom').notEmpty().withMessage('Le nom est requis'),
  body('description').notEmpty().withMessage('La description est requise')
], PartenaireController.creer);

router.put('/:id', authentifier, [
  body('nom').optional().notEmpty().withMessage('Le nom ne peut pas être vide'),
  body('description').optional().notEmpty().withMessage('La description ne peut pas être vide')
], PartenaireController.mettreAJour);

router.delete('/:id', authentifier, PartenaireController.supprimer);

module.exports = router;