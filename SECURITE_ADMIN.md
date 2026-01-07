# 🔒 Guide de Sécurité - Administration

## ⚠️ IMPORTANT - Configuration Initiale

### Identifiants par défaut

Lors du premier démarrage, les identifiants admin par défaut sont :
- **Nom d'utilisateur :** `admin`
- **Mot de passe :** `admin123`

**⚠️ CHANGEZ CES IDENTIFIANTS IMMÉDIATEMENT EN PRODUCTION !**

### Comment changer le mot de passe

1. Connectez-vous avec les identifiants par défaut
2. Le changement de mot de passe peut être ajouté dans le dashboard (fonctionnalité disponible dans `adminAuth.js`)

## 🔐 Système d'authentification

### Fonctionnement

- **Session Storage** : Les sessions sont stockées dans `sessionStorage` (expire à la fermeture de l'onglet)
- **Expiration** : Les sessions expirent après 24 heures
- **Protection des routes** : La route `/admin` est protégée et redirige vers `/admin/login` si non authentifié

### Routes

- `/admin/login` - Page de connexion admin
- `/admin` - Tableau de bord (protégé, nécessite authentification)

## 🛡️ Sécurité

### Ce qui est sécurisé

✅ Protection de la route `/admin`  
✅ Sessions avec expiration (24h)  
✅ Redirection automatique si non authentifié  
✅ Stockage séparé des credentials et sessions  

### ⚠️ Limitations actuelles (à améliorer en production)

1. **Mots de passe en clair** : Les mots de passe sont stockés en clair dans localStorage
   - **Solution production** : Utiliser un hash (bcrypt, argon2)

2. **Pas de backend** : Tout est côté client
   - **Solution production** : Créer un backend avec API sécurisée

3. **Pas de HTTPS obligatoire** : En développement seulement
   - **Solution production** : Utiliser HTTPS obligatoire

4. **Pas de rate limiting** : Pas de protection contre les attaques par force brute
   - **Solution production** : Ajouter un système de rate limiting

5. **Pas de 2FA** : Pas d'authentification à deux facteurs
   - **Solution production** : Ajouter 2FA (TOTP, SMS, Email)

## 📝 Recommandations pour la production

### 1. Backend sécurisé

```javascript
// Exemple avec Node.js + Express + JWT
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Hash du mot de passe
const hashedPassword = await bcrypt.hash(password, 10);

// Vérification
const isValid = await bcrypt.compare(inputPassword, hashedPassword);

// Génération de token JWT
const token = jwt.sign({ userId: admin.id }, process.env.JWT_SECRET, {
  expiresIn: '24h'
});
```

### 2. Base de données

- Utiliser une base de données (PostgreSQL, MongoDB, etc.)
- Stocker les hash de mots de passe, pas les mots de passe en clair
- Utiliser des requêtes préparées pour éviter les injections SQL

### 3. HTTPS

- Forcer HTTPS en production
- Utiliser des certificats SSL valides

### 4. Rate Limiting

```javascript
// Exemple avec express-rate-limit
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // 5 tentatives max
});
```

### 5. Logs et monitoring

- Logger toutes les tentatives de connexion
- Alerter en cas de tentatives suspectes
- Monitorer les accès admin

## 🔧 Fichiers de sécurité

- `src/lib/adminAuth.js` - Service d'authentification
- `src/components/AdminLogin.jsx` - Page de connexion
- `src/components/ProtectedRoute.jsx` - Protection des routes
- `src/components/AdminDashboard.jsx` - Dashboard avec bouton déconnexion

## 🚨 En cas de compromission

1. **Changez immédiatement le mot de passe admin**
2. **Vérifiez les logs d'accès**
3. **Révoquez toutes les sessions actives**
4. **Analysez les données modifiées**

## 📞 Support

Pour toute question de sécurité, contactez l'équipe de développement.

---

**Dernière mise à jour :** $(date)  
**Version :** 1.0.0
