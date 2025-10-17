const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

// Charger les variables d'environnement
dotenv.config();

const app = express();

// Middleware de sécurité
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Limiteur de taux
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite chaque IP à 100 requêtes par windowMs
  message: 'Trop de requêtes depuis cette IP, veuillez réessayer plus tard.'
});
app.use(limiter);

// Routes
const utilisateurRoutes = require('./routes/utilisateurRoutes');
const projetRoutes = require('./routes/projetRoutes');
const investissementRoutes = require('./routes/investissementRoutes');
const articleRoutes = require('./routes/articleRoutes');
const partenaireRoutes = require('./routes/partenaireRoutes');

app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/projets', projetRoutes);
app.use('/api/investissements', investissementRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/partenaires', partenaireRoutes);

// Route de base
app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API de Tanzil Corporation');
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Quelque chose s\'est mal passé!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});

module.exports = app;