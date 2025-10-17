# Tanzil Corporation - Site Web

Projet web complet pour Tanzil Corporation, entreprise leader dans le BTP, la Promotion et la Distribution.

## Architecture

### Frontend (Angular 18+)
- **Framework**: Angular 18+ avec Standalone Components
- **Routing**: Lazy Loading
- **State Management**: Signals
- **Styling**: TailwindCSS
- **Animations**: GSAP + ScrollTrigger
- **Internationalisation**: ngx-translate (Français/Anglais)
- **SEO**: Optimisation des performances et métadonnées

### Backend (Node.js + Express)
- **Base de données**: PostgreSQL
- **Authentification**: JWT + bcrypt
- **Architecture**: Design Pattern Repository
- **Sécurité**: helmet, cors, rate-limit, express-validator
- **Notifications**: Nodemailer
- **Stockage**: Cloudinary pour les médias

## Structure du projet

```
tanzil-corporation/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── components/
    │   │   ├── pages/
    │   │   ├── services/
    │   │   ├── guards/
    │   │   ├── interceptors/
    │   │   ├── app.component.ts
    │   │   ├── app.config.ts
    │   │   └── app.routes.ts
    │   ├── assets/
    │   │   ├── i18n/
    │   │   ├── images/
    │   │   └── media/
    │   └── environments/
    ├── package.json
    ├── angular.json
    ├── tailwind.config.js
    └── tsconfig.json
```

## Installation et Configuration

### Backend

1. Installer les dépendances:
```bash
cd backend
npm install
```

2. Configurer la base de données:
```bash
# Créer une base de données PostgreSQL
createdb tanzil_db

# Exécuter le script SQL pour créer les tables
psql -d tanzil_db -f scripts/init.sql
```

3. Configurer les variables d'environnement:
```bash
cp .env.example .env
# Éditer .env avec vos valeurs
```

4. Démarrer le serveur:
```bash
npm run dev
```

### Frontend

1. Installer les dépendances:
```bash
cd frontend
npm install
```

2. Démarrer le serveur de développement:
```bash
npm start
```

## Fonctionnalités principales

### Pages
- **Accueil**: Hero avec vidéo d'arrière-plan animée, sections Vision & Innovation, Projets, Partenaires
- **À propos**: Timeline historique animée, équipe dirigeante, valeurs
- **Activités**: Présentation des 4 domaines (BTP, Promotion, Distribution, Innovation)
- **Projets**: Liste filtrable des projets (réalisés/en cours), page détail
- **Investissement**: Concept d'investissement participatif, formulaire d'inscription
- **Blog**: Articles avec pagination, page détail
- **Contact**: Formulaire de contact, informations, carte, WhatsApp
- **Dashboard**: Espace adhérent avec statistiques, historique, graphiques

### Animations GSAP
- Scroll-triggered animations (fade-in, slide-up, parallaxe)
- Hover effects sur les cartes et boutons
- Timeline animée dans la page À propos
- Vidéo d'arrière-plan animée au scroll

### Sécurité
- Authentification JWT
- Validation des données d'entrée
- Protection contre les attaques XSS et CSRF
- Rate limiting

## Technologies utilisées

### Frontend
- Angular 18+
- TypeScript
- TailwindCSS
- GSAP
- ngx-translate
- RxJS

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT
- bcrypt
- Multer
- Cloudinary

## Développement

### Scripts disponibles

#### Frontend
- `npm start`: Démarre le serveur de développement
- `npm run build`: Construit l'application pour la production
- `npm test`: Exécute les tests

#### Backend
- `npm run dev`: Démarre le serveur en mode développement (avec nodemon)
- `npm start`: Démarre le serveur en production
- `npm test`: Exécute les tests

## Déploiement

### Production
1. Construire le frontend:
```bash
cd frontend
npm run build --prod
```

2. Configurer le backend pour la production
3. Déployer sur un serveur (Heroku, AWS, etc.)

## Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -am 'Ajoute nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créer une Pull Request

## Licence

Ce projet est sous licence MIT.

## Contact

Tanzil Corporation
- Email: contact@tanzil.com
- Téléphone: +225 XX XX XX XX
- Adresse: Abidjan, Côte d'Ivoire