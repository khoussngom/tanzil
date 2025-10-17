const ArticleService = require('../services/ArticleService');
const { validationResult } = require('express-validator');

class ArticleController {
  async creer(req, res) {
    try {
      const erreurs = validationResult(req);
      if (!erreurs.isEmpty()) {
        return res.status(400).json({ erreurs: erreurs.array() });
      }

      const article = await ArticleService.creerArticle({
        ...req.body,
        auteur_id: req.utilisateur.id // Assumant que l'utilisateur est authentifié
      });
      res.status(201).json({
        message: 'Article créé avec succès',
        article
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async obtenirParId(req, res) {
    try {
      const article = await ArticleService.obtenirArticleParId(req.params.id);
      res.json(article);
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

      const article = await ArticleService.mettreAJourArticle(req.params.id, req.body);
      res.json({
        message: 'Article mis à jour avec succès',
        article
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async supprimer(req, res) {
    try {
      await ArticleService.supprimerArticle(req.params.id);
      res.json({ message: 'Article supprimé avec succès' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async lister(req, res) {
    try {
      const articles = await ArticleService.listerArticles(req.query);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async recents(req, res) {
    try {
      const limite = req.query.limite || 10;
      const articles = await ArticleService.obtenirArticlesRecents(limite);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ArticleController();