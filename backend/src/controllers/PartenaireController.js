const PartenaireService = require('../services/PartenaireService');
const { validationResult } = require('express-validator');

class PartenaireController {
  async creer(req, res) {
    try {
      const erreurs = validationResult(req);
      if (!erreurs.isEmpty()) {
        return res.status(400).json({ erreurs: erreurs.array() });
      }

      const partenaire = await PartenaireService.creerPartenaire(req.body);
      res.status(201).json({
        message: 'Partenaire créé avec succès',
        partenaire
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async obtenirParId(req, res) {
    try {
      const partenaire = await PartenaireService.obtenirPartenaireParId(req.params.id);
      res.json(partenaire);
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

      const partenaire = await PartenaireService.mettreAJourPartenaire(req.params.id, req.body);
      res.json({
        message: 'Partenaire mis à jour avec succès',
        partenaire
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async supprimer(req, res) {
    try {
      await PartenaireService.supprimerPartenaire(req.params.id);
      res.json({ message: 'Partenaire supprimé avec succès' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async lister(req, res) {
    try {
      const partenaires = await PartenaireService.listerPartenaires();
      res.json(partenaires);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async actifs(req, res) {
    try {
      const partenaires = await PartenaireService.listerPartenairesActifs();
      res.json(partenaires);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new PartenaireController();