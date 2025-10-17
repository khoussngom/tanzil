const prisma = require('../config/prisma');

class UtilisateurRepository {
  async creerUtilisateur(utilisateur) {
    return await prisma.utilisateur.create({
      data: {
        nom: utilisateur.nom,
        email: utilisateur.email,
        mot_de_passe: utilisateur.mot_de_passe,
        role: utilisateur.role || 'adherent'
      },
      select: {
        id: true,
        nom: true,
        email: true,
        role: true,
        date_creation: true
      }
    });
  }

  async trouverParEmail(email) {
    return await prisma.utilisateur.findUnique({
      where: { email }
    });
  }

  async trouverParId(id) {
    return await prisma.utilisateur.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        nom: true,
        email: true,
        role: true,
        date_creation: true
      }
    });
  }

  async mettreAJourUtilisateur(id, misesAJour) {
    return await prisma.utilisateur.update({
      where: { id: parseInt(id) },
      data: misesAJour,
      select: {
        id: true,
        nom: true,
        email: true,
        role: true,
        date_creation: true
      }
    });
  }

  async supprimerUtilisateur(id) {
    return await prisma.utilisateur.delete({
      where: { id: parseInt(id) },
      select: { id: true }
    });
  }

  async listerUtilisateurs(filtres = {}) {
    const where = {};
    if (filtres.role) {
      where.role = filtres.role;
    }

    return await prisma.utilisateur.findMany({
      where,
      select: {
        id: true,
        nom: true,
        email: true,
        role: true,
        date_creation: true
      },
      orderBy: {
        date_creation: 'desc'
      }
    });
  }
}

module.exports = new UtilisateurRepository();