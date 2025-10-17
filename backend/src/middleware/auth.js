const jwt = require('jsonwebtoken');
const UtilisateurService = require('../services/UtilisateurService');
const config = require('../config/env');

const authentifier = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Token d\'authentification requis' });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    const utilisateur = await UtilisateurService.obtenirProfilUtilisateur(decoded.id);

    if (!utilisateur) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }

    req.utilisateur = utilisateur;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide' });
  }
};

const verifierRole = (roles) => {
  return (req, res, next) => {
    if (!req.utilisateur) {
      return res.status(401).json({ message: 'Authentification requise' });
    }

    if (!roles.includes(req.utilisateur.role)) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    next();
  };
};

module.exports = {
  authentifier,
  verifierRole
};