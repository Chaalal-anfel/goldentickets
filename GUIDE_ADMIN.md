# 📋 Guide d'utilisation - Système de gestion des demandes

## 🎯 Fonctionnalités

Le système permet de :
- ✅ Enregistrer les demandes d'inscription avec statut "non traité"
- ✅ Visualiser toutes les demandes dans un tableau d'administration
- ✅ Filtrer les demandes par statut
- ✅ Rechercher dans les demandes
- ✅ Modifier le statut des demandes
- ✅ Supprimer des demandes

## 🔐 Authentification Admin

**⚠️ IMPORTANT :** L'accès au tableau de bord est maintenant sécurisé !

### Identifiants par défaut
- **Nom d'utilisateur :** `admin`
- **Mot de passe :** `admin123`

**⚠️ Changez ces identifiants en production !** (voir `SECURITE_ADMIN.md`)

### Connexion
1. Accédez à : `http://localhost:5173/admin/login`
2. Entrez vos identifiants admin
3. Vous serez redirigé vers le tableau de bord

### Déconnexion
- Cliquez sur le bouton "Déconnexion" en haut à droite du tableau de bord
- La session expire automatiquement après 24h ou à la fermeture de l'onglet

## 🚀 Utilisation

### Pour les utilisateurs (Inscription)

1. Accédez à la page d'inscription : `/register` ou cliquez sur "Login" dans la navbar
2. Remplissez le formulaire :
   - Nom complet
   - Téléphone
   - Email
   - Mot de passe (min. 6 caractères)
   - Confirmation du mot de passe
3. Cliquez sur "Create account"
4. Un message de confirmation apparaîtra
5. La demande est automatiquement sauvegardée avec le statut "non traité"

### Pour les administrateurs (Tableau de bord)

1. **Connectez-vous d'abord** : `http://localhost:5173/admin/login`
2. Après authentification, vous serez redirigé vers : `http://localhost:5173/admin`
2. Visualisez toutes les demandes dans le tableau
3. Utilisez les filtres en haut pour voir les demandes par statut :
   - **Tous** : Toutes les demandes
   - **Non traité** : Demandes en attente
   - **En cours** : Demandes en traitement
   - **Traité** : Demandes complétées
   - **Rejeté** : Demandes refusées
4. Utilisez la barre de recherche pour trouver une demande spécifique (nom, email, téléphone)
5. Modifiez le statut d'une demande en utilisant le menu déroulant dans la colonne "Statut"
6. Supprimez une demande en cliquant sur l'icône poubelle

## 📊 Statuts disponibles

- **Non traité** : Demande reçue, en attente de traitement (statut par défaut)
- **En cours** : Demande en cours de traitement
- **Traité** : Demande complétée
- **Rejeté** : Demande refusée

## 💾 Stockage des données

Les données sont stockées dans le **localStorage** du navigateur. Cela signifie :
- ✅ Les données persistent même après fermeture du navigateur
- ⚠️ Les données sont spécifiques à chaque navigateur/appareil
- ⚠️ Les données peuvent être effacées si l'utilisateur vide le cache

**Note importante** : Pour un environnement de production, il est recommandé d'utiliser une base de données (Firebase, Supabase, MongoDB, etc.) au lieu du localStorage.

## 🔒 Sécurité

⚠️ **Attention** : Actuellement, les mots de passe ne sont pas stockés (bonne pratique), mais le système n'a pas d'authentification pour accéder à `/admin`.

**Recommandations pour la production** :
1. Ajouter une authentification pour protéger la route `/admin`
2. Utiliser un backend avec base de données
3. Hasher les mots de passe si vous devez les stocker
4. Ajouter des validations côté serveur

## 🛠️ Structure technique

### Fichiers créés/modifiés

1. **`src/lib/requestsStorage.js`** : Service de gestion du stockage
   - `getAllRequests()` : Récupère toutes les demandes
   - `saveRequest(data)` : Sauvegarde une nouvelle demande
   - `updateRequestStatus(id, status)` : Met à jour le statut
   - `deleteRequest(id)` : Supprime une demande
   - `getRequestsByStatus(status)` : Filtre par statut
   - `emailExists(email)` : Vérifie si un email existe

2. **`src/components/RegisterLogin.jsx`** : Formulaire d'inscription/connexion
   - Validation des champs
   - Messages de succès/erreur
   - Sauvegarde automatique des demandes

3. **`src/components/AdminDashboard.jsx`** : Tableau de bord d'administration
   - Affichage des demandes
   - Filtrage et recherche
   - Gestion des statuts
   - Suppression de demandes

4. **`src/App.jsx`** : Route `/admin` ajoutée

## 📝 Format des données

Chaque demande contient :
```javascript
{
  id: "unique-id",
  email: "user@example.com",
  fullName: "John Doe",
  phone: "+1 234 567 890",
  status: "non traité",
  createdAt: "2024-01-15T10:30:00.000Z",
  updatedAt: "2024-01-15T10:30:00.000Z"
}
```

## 🎨 Interface

- Design cohérent avec le reste du site (thème doré)
- Animations fluides avec Framer Motion
- Responsive (mobile et desktop)
- Auto-refresh toutes les 5 secondes

## 🐛 Dépannage

### Les demandes n'apparaissent pas
- Vérifiez que vous êtes sur la route `/admin`
- Vérifiez la console du navigateur pour les erreurs
- Vérifiez que le localStorage n'est pas bloqué

### Impossible de sauvegarder une demande
- Vérifiez que tous les champs requis sont remplis
- Vérifiez que l'email n'existe pas déjà
- Vérifiez la console pour les erreurs

### Les données disparaissent
- Le localStorage peut être effacé si l'utilisateur vide le cache
- Les données sont spécifiques au navigateur/appareil

---

**Besoin d'aide ?** Consultez le code source ou contactez le développeur.
