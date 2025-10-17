const ArticleRepository = require('../repositories/ArticleRepository');

class ArticleService {
  async creerArticle(donneesArticle) {
    return await ArticleRepository.creerArticle(donneesArticle);
  }

  async obtenirArticleParId(id) {
    const article = await ArticleRepository.trouverParId(id);
    if (!article) {
      throw new Error('Article non trouvé');
    }
    return article;
  }

  async mettreAJourArticle(id, misesAJour) {
    return await ArticleRepository.mettreAJourArticle(id, misesAJour);
  }

  async supprimerArticle(id) {
    return await ArticleRepository.supprimerArticle(id);
  }

  async listerArticles(filtres) {
    return await ArticleRepository.listerArticles(filtres);
  }

  async obtenirArticlesRecents(limite) {
    return await ArticleRepository.articlesRecents(limite);
  }
}

module.exports = new ArticleService();