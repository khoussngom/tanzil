const InvestissementService = require('../services/InvestissementService');
const { validationResult } = require('express-validator');

class InvestissementController {
  async creer(req, res) {
    try {
      const erreurs = validationResult(req);
      if (!erreurs.isEmpty()) {
        return res.status(400).json({ erreurs: erreurs.array() });
      }

      const investissement = await InvestissementService.creerInvestissement({
        ...req.body,
        utilisateur_id: req.utilisateur.id // Assumant que l'utilisateur est authentifié
      });
      res.status(201).json({
        message: 'Investissement créé avec succès',
        investissement
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async obtenirParId(req, res) {
    try {
      const investissement = await InvestissementService.obtenirInvestissementParId(req.params.id);
      res.json(investissement);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async historiqueUtilisateur(req, res) {
    try {
      const investissements = await InvestissementService.obtenirHistoriqueUtilisateur(req.params.utilisateurId);
      res.json(investissements);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async totalParProjet(req, res) {
    try {
      const total = await InvestissementService.obtenirTotalInvestiParProjet(req.params.projetId);
      res.json({ total });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async supprimer(req, res) {
    try {
      await InvestissementService.supprimerInvestissement(req.params.id);
      res.json({ message: 'Investissement supprimé avec succès' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async statistiques(req, res) {
    try {
      const stats = await InvestissementService.obtenirStatistiquesInvestissements(req.params.utilisateurId);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new InvestissementController();