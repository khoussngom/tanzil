const UtilisateurRepository = require('../repositories/UtilisateurRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/env');

class UtilisateurService {
  async inscrireUtilisateur(donneesUtilisateur) {
    // Vérifier si l'utilisateur existe déjà
    const utilisateurExistant = await UtilisateurRepository.trouverParEmail(donneesUtilisateur.email);
    if (utilisateurExistant) {
      throw new Error('Un utilisateur avec cet email existe déjà');
    }

    // Hasher le mot de passe
    const motDePasseHash = await bcrypt.hash(donneesUtilisateur.mot_de_passe, 10);

    const nouvelUtilisateur = {
      ...donneesUtilisateur,
      mot_de_passe: motDePasseHash
    };

    return await UtilisateurRepository.creerUtilisateur(nouvelUtilisateur);
  }

  async connecterUtilisateur(email, motDePasse) {
    const utilisateur = await UtilisateurRepository.trouverParEmail(email);
    if (!utilisateur) {
      throw new Error('Email ou mot de passe incorrect');
    }

    const motDePasseValide = await bcrypt.compare(motDePasse, utilisateur.mot_de_passe);
    if (!motDePasseValide) {
      throw new Error('Email ou mot de passe incorrect');
    }

    // Générer le token JWT
    const token = jwt.sign(
      { id: utilisateur.id, email: utilisateur.email, role: utilisateur.role },
      config.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return { utilisateur, token };
  }

  async obtenirProfilUtilisateur(id) {
    const utilisateur = await UtilisateurRepository.trouverParId(id);
    if (!utilisateur) {
      throw new Error('Utilisateur non trouvé');
    }
    return utilisateur;
  }

  async mettreAJourProfil(id, misesAJour) {
    if (misesAJour.mot_de_passe) {
      misesAJour.mot_de_passe = await bcrypt.hash(misesAJour.mot_de_passe, 10);
    }

    return await UtilisateurRepository.mettreAJourUtilisateur(id, misesAJour);
  }

  async supprimerUtilisateur(id) {
    return await UtilisateurRepository.supprimerUtilisateur(id);
  }

  async listerUtilisateurs(filtres) {
    return await UtilisateurRepository.listerUtilisateurs(filtres);
  }

  async verifierToken(token) {
    try {
      return jwt.verify(token, config.JWT_SECRET);
    } catch (error) {
      throw new Error('Token invalide');
    }
  }
}

module.exports = new UtilisateurService();