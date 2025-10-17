const prisma = require('../config/prisma');

class ArticleRepository {
  async creerArticle(article) {
    return await prisma.article.create({
      data: {
        titre: article.titre,
        contenu: article.contenu,
        auteur_id: parseInt(article.auteur_id),
        image_couverture: article.image_couverture,
        date_publication: article.date_publication ? new Date(article.date_publication) : new Date()
      }
    });
  }

  async trouverParId(id) {
    return await prisma.article.findUnique({
      where: { id: parseInt(id) }
    });
  }

  async mettreAJourArticle(id, misesAJour) {
    const data = { ...misesAJour };
    if (data.date_publication) data.date_publication = new Date(data.date_publication);

    return await prisma.article.update({
      where: { id: parseInt(id) },
      data
    });
  }

  async supprimerArticle(id) {
    return await prisma.article.delete({
      where: { id: parseInt(id) },
      select: { id: true }
    });
  }

  async listerArticles(filtres = {}) {
    const where = {};
    if (filtres.auteur_id) {
      where.auteur_id = parseInt(filtres.auteur_id);
    }

    return await prisma.article.findMany({
      where,
      include: {
        auteur: {
          select: {
            nom: true
          }
        }
      },
      orderBy: {
        date_publication: 'desc'
      }
    });
  }

  async articlesRecents(limite = 10) {
    return await prisma.article.findMany({
      take: parseInt(limite),
      include: {
        auteur: {
          select: {
            nom: true
          }
        }
      },
      orderBy: {
        date_publication: 'desc'
      }
    });
  }
}

module.exports = new ArticleRepository();