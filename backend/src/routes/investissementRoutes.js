const express = require('express');
const router = express.Router();
const InvestissementController = require('../controllers/InvestissementController');
const { body } = require('express-validator');
const { authentifier } = require('../middleware/auth');

router.post('/', authentifier, [
  body('projet_id').isNumeric().withMessage('ID de projet invalide'),
  body('montant').isNumeric().withMessage('Le montant doit être un nombre')
], InvestissementController.creer);

router.get('/:id', authentifier, InvestissementController.obtenirParId);
router.get('/utilisateur/:utilisateurId/historique', authentifier, InvestissementController.historiqueUtilisateur);
router.get('/projet/:projetId/total', authentifier, InvestissementController.totalParProjet);
router.get('/utilisateur/:utilisateurId/statistiques', authentifier, InvestissementController.statistiques);

router.delete('/:id', authentifier, InvestissementController.supprimer);

module.exports = router;