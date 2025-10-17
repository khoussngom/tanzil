const prisma = require('../config/prisma');

class InvestissementRepository {
  async creerInvestissement(investissement) {
    return await prisma.investissement.create({
      data: {
        utilisateur_id: parseInt(investissement.utilisateur_id),
        projet_id: parseInt(investissement.projet_id),
        montant: parseFloat(investissement.montant),
        date_investissement: investissement.date_investissement ? new Date(investissement.date_investissement) : new Date()
      }
    });
  }

  async trouverParId(id) {
    return await prisma.investissement.findUnique({
      where: { id: parseInt(id) }
    });
  }

  async listerParUtilisateur(utilisateur_id) {
    return await prisma.investissement.findMany({
      where: { utilisateur_id: parseInt(utilisateur_id) },
      include: {
        projet: {
          select: {
            titre: true
          }
        }
      },
      orderBy: {
        date_investissement: 'desc'
      }
    });
  }

  async totalParProjet(projet_id) {
    const result = await prisma.investissement.aggregate({
      where: { projet_id: parseInt(projet_id) },
      _sum: {
        montant: true
      }
    });
    return result._sum.montant || 0;
  }

  async historiqueUtilisateur(utilisateur_id) {
    return await prisma.investissement.findMany({
      where: { utilisateur_id: parseInt(utilisateur_id) },
      include: {
        projet: {
          select: {
            titre: true,
            statut: true
          }
        }
      },
      orderBy: {
        date_investissement: 'desc'
      }
    });
  }

  async supprimerInvestissement(id) {
    return await prisma.investissement.delete({
      where: { id: parseInt(id) },
      select: { id: true }
    });
  }
}

module.exports = new InvestissementRepository();