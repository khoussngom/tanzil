const prisma = require('../config/prisma');

class ProjetRepository {
  async creerProjet(projet) {
    return await prisma.projet.create({
      data: {
        titre: projet.titre,
        description: projet.description,
        statut: projet.statut,
        date_debut: projet.date_debut ? new Date(projet.date_debut) : null,
        date_fin: projet.date_fin ? new Date(projet.date_fin) : null,
        budget: projet.budget,
        categorie: projet.categorie
      }
    });
  }

  async trouverParId(id) {
    return await prisma.projet.findUnique({
      where: { id: parseInt(id) }
    });
  }

  async mettreAJourProjet(id, misesAJour) {
    const data = { ...misesAJour };
    if (data.date_debut) data.date_debut = new Date(data.date_debut);
    if (data.date_fin) data.date_fin = new Date(data.date_fin);

    return await prisma.projet.update({
      where: { id: parseInt(id) },
      data
    });
  }

  async supprimerProjet(id) {
    return await prisma.projet.delete({
      where: { id: parseInt(id) },
      select: { id: true }
    });
  }

  async listerProjets(filtres = {}) {
    const where = {};
    if (filtres.statut) {
      where.statut = filtres.statut;
    }
    if (filtres.categorie) {
      where.categorie = filtres.categorie;
    }

    return await prisma.projet.findMany({
      where,
      orderBy: {
        date_creation: 'desc'
      }
    });
  }

  async compterParStatut() {
    const result = await prisma.projet.groupBy({
      by: ['statut'],
      _count: {
        statut: true
      }
    });

    return result.map(item => ({
      statut: item.statut,
      nombre: item._count.statut
    }));
  }
}

module.exports = new ProjetRepository();