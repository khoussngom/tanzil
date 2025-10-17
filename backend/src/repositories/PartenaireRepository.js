const prisma = require('../config/prisma');

class PartenaireRepository {
  async creerPartenaire(partenaire) {
    return await prisma.partenaire.create({
      data: {
        nom: partenaire.nom,
        description: partenaire.description,
        logo_url: partenaire.logo_url,
        site_web: partenaire.site_web,
        date_partnership: partenaire.date_partnership ? new Date(partenaire.date_partnership) : new Date(),
        actif: partenaire.actif !== undefined ? partenaire.actif : true
      }
    });
  }

  async trouverParId(id) {
    return await prisma.partenaire.findUnique({
      where: { id: parseInt(id) }
    });
  }

  async mettreAJourPartenaire(id, misesAJour) {
    const data = { ...misesAJour };
    if (data.date_partnership) data.date_partnership = new Date(data.date_partnership);

    return await prisma.partenaire.update({
      where: { id: parseInt(id) },
      data
    });
  }

  async supprimerPartenaire(id) {
    return await prisma.partenaire.delete({
      where: { id: parseInt(id) },
      select: { id: true }
    });
  }

  async listerPartenaires() {
    return await prisma.partenaire.findMany({
      orderBy: {
        date_partnership: 'desc'
      }
    });
  }

  async partenairesActifs() {
    return await prisma.partenaire.findMany({
      where: { actif: true },
      orderBy: {
        date_partnership: 'desc'
      }
    });
  }
}

module.exports = new PartenaireRepository();