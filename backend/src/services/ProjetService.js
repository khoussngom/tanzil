const ProjetRepository = require('../repositories/ProjetRepository');

class ProjetService {
  async creerProjet(donneesProjet) {
    return await ProjetRepository.creerProjet(donneesProjet);
  }

  async obtenirProjetParId(id) {
    const projet = await ProjetRepository.trouverParId(id);
    if (!projet) {
      throw new Error('Projet non trouvé');
    }
    return projet;
  }

  async mettreAJourProjet(id, misesAJour) {
    return await ProjetRepository.mettreAJourProjet(id, misesAJour);
  }

  async supprimerProjet(id) {
    return await ProjetRepository.supprimerProjet(id);
  }

  async listerProjets(filtres) {
    return await ProjetRepository.listerProjets(filtres);
  }

  async obtenirStatistiquesProjets() {
    const stats = await ProjetRepository.compterParStatut();
    return stats.reduce((acc, stat) => {
      acc[stat.statut] = parseInt(stat.nombre);
      return acc;
    }, {});
  }

  async projetsRealises() {
    return await ProjetRepository.listerProjets({ statut: 'realise' });
  }

  async projetsEnCours() {
    return await ProjetRepository.listerProjets({ statut: 'en_cours' });
  }
}

module.exports = new ProjetService();