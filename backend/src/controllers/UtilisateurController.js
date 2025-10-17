const UtilisateurService = require('../services/UtilisateurService');
const { validationResult } = require('express-validator');

class UtilisateurController {
  async inscrire(req, res) {
    try {
      const erreurs = validationResult(req);
      if (!erreurs.isEmpty()) {
        return res.status(400).json({ erreurs: erreurs.array() });
      }

      const utilisateur = await UtilisateurService.inscrireUtilisateur(req.body);
      res.status(201).json({
        message: 'Utilisateur inscrit avec succès',
        utilisateur: {
          id: utilisateur.id,
          nom: utilisateur.nom,
          email: utilisateur.email,
          role: utilisateur.role
        }
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async connecter(req, res) {
    try {
      const { email, mot_de_passe } = req.body;
      const { utilisateur, token } = await UtilisateurService.connecterUtilisateur(email, mot_de_passe);
      res.json({
        message: 'Connexion réussie',
        utilisateur: {
          id: utilisateur.id,
          nom: utilisateur.nom,
          email: utilisateur.email,
          role: utilisateur.role
        },
        token
      });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  async obtenirProfil(req, res) {
    try {
      const utilisateur = await UtilisateurService.obtenirProfilUtilisateur(req.params.id);
      res.json(utilisateur);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async mettreAJourProfil(req, res) {
    try {
      const erreurs = validationResult(req);
      if (!erreurs.isEmpty()) {
        return res.status(400).json({ erreurs: erreurs.array() });
      }

      const utilisateur = await UtilisateurService.mettreAJourProfil(req.params.id, req.body);
      res.json({
        message: 'Profil mis à jour avec succès',
        utilisateur
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async supprimer(req, res) {
    try {
      await UtilisateurService.supprimerUtilisateur(req.params.id);
      res.json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async lister(req, res) {
    try {
      const utilisateurs = await UtilisateurService.listerUtilisateurs(req.query);
      res.json(utilisateurs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new UtilisateurController();