const ProjetService = require('../services/ProjetService');
const { validationResult } = require('express-validator');

class ProjetController {
  async creer(req, res) {
    try {
      const erreurs = validationResult(req);
      if (!erreurs.isEmpty()) {
        return res.status(400).json({ erreurs: erreurs.array() });
      }

      const projet = await ProjetService.creerProjet(req.body);
      res.status(201).json({
        message: 'Projet créé avec succès',
        projet
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async obtenirParId(req, res) {
    try {
      const projet = await ProjetService.obtenirProjetParId(req.params.id);
      res.json(projet);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async mettreAJour(req, res) {
    try {
      const erreurs = validationResult(req);
      if (!erreurs.isEmpty()) {
        return res.status(400).json({ erreurs: erreurs.array() });
      }

      const projet = await ProjetService.mettreAJourProjet(req.params.id, req.body);
      res.json({
        message: 'Projet mis à jour avec succès',
        projet
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async supprimer(req, res) {
    try {
      await ProjetService.supprimerProjet(req.params.id);
      res.json({ message: 'Projet supprimé avec succès' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async lister(req, res) {
    try {
      const projets = await ProjetService.listerProjets(req.query);
      res.json(projets);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async statistiques(req, res) {
    try {
      const stats = await ProjetService.obtenirStatistiquesProjets();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async realisés(req, res) {
    try {
      const projets = await ProjetService.projetsRealises();
      res.json(projets);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async enCours(req, res) {
    try {
      const projets = await ProjetService.projetsEnCours();
      res.json(projets);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ProjetController();