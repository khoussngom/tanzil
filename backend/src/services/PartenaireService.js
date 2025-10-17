const PartenaireRepository = require('../repositories/PartenaireRepository');

class PartenaireService {
  async creerPartenaire(donneesPartenaire) {
    return await PartenaireRepository.creerPartenaire(donneesPartenaire);
  }

  async obtenirPartenaireParId(id) {
    const partenaire = await PartenaireRepository.trouverParId(id);
    if (!partenaire) {
      throw new Error('Partenaire non trouvé');
    }
    return partenaire;
  }

  async mettreAJourPartenaire(id, misesAJour) {
    return await PartenaireRepository.mettreAJourPartenaire(id, misesAJour);
  }

  async supprimerPartenaire(id) {
    return await PartenaireRepository.supprimerPartenaire(id);
  }

  async listerPartenaires() {
    return await PartenaireRepository.listerPartenaires();
  }

  async listerPartenairesActifs() {
    return await PartenaireRepository.partenairesActifs();
  }
}

module.exports = new PartenaireService();