const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/ArticleController');
const { body } = require('express-validator');
const { authentifier } = require('../middleware/auth');

router.get('/', ArticleController.lister);
router.get('/recents', ArticleController.recents);
router.get('/:id', ArticleController.obtenirParId);

router.post('/', authentifier, [
  body('titre').notEmpty().withMessage('Le titre est requis'),
  body('contenu').notEmpty().withMessage('Le contenu est requis')
], ArticleController.creer);

router.put('/:id', authentifier, [
  body('titre').optional().notEmpty().withMessage('Le titre ne peut pas être vide'),
  body('contenu').optional().notEmpty().withMessage('Le contenu ne peut pas être vide')
], ArticleController.mettreAJour);

router.delete('/:id', authentifier, ArticleController.supprimer);

module.exports = router;