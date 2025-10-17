const InvestissementRepository = require('../repositories/InvestissementRepository');
const ProjetRepository = require('../repositories/ProjetRepository');

class InvestissementService {
  async creerInvestissement(donneesInvestissement) {
    // Vérifier si le projet existe et est ouvert à l'investissement
    const projet = await ProjetRepository.trouverParId(donneesInvestissement.projet_id);
    if (!projet) {
      throw new Error('Projet non trouvé');
    }
    if (projet.statut !== 'en_cours') {
      throw new Error('Ce projet n\'est pas ouvert à l\'investissement');
    }

    return await InvestissementRepository.creerInvestissement(donneesInvestissement);
  }

  async obtenirInvestissementParId(id) {
    const investissement = await InvestissementRepository.trouverParId(id);
    if (!investissement) {
      throw new Error('Investissement non trouvé');
    }
    return investissement;
  }

  async listerInvestissementsUtilisateur(utilisateur_id) {
    return await InvestissementRepository.listerParUtilisateur(utilisateur_id);
  }

  async obtenirTotalInvestiParProjet(projet_id) {
    return await InvestissementRepository.totalParProjet(projet_id);
  }

  async obtenirHistoriqueUtilisateur(utilisateur_id) {
    return await InvestissementRepository.historiqueUtilisateur(utilisateur_id);
  }

  async supprimerInvestissement(id) {
    return await InvestissementRepository.supprimerInvestissement(id);
  }

  async obtenirStatistiquesInvestissements(utilisateur_id) {
    const investissements = await InvestissementRepository.listerParUtilisateur(utilisateur_id);
    const totalInvesti = investissements.reduce((sum, inv) => sum + parseFloat(inv.montant), 0);
    const nombreProjets = new Set(investissements.map(inv => inv.projet_id)).size;

    return {
      total_investi: totalInvesti,
      nombre_projets: nombreProjets,
      nombre_investissements: investissements.length
    };
  }
}

module.exports = new InvestissementService();