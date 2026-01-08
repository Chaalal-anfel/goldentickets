# 🔍 Guide de Débogage - Formulaire de Login

## Problèmes courants et solutions

### 1. Erreur CORS (Cross-Origin Resource Sharing)

**Symptôme :** Erreur dans la console : `Access to fetch at '...' from origin '...' has been blocked by CORS policy`

**Solution :**
- Le serveur `b2b.goldentkts.com` doit autoriser les requêtes depuis votre domaine
- Contactez l'administrateur du serveur pour ajouter votre domaine aux en-têtes CORS
- Ou utilisez un proxy backend

### 2. Format des données incorrect

**Symptôme :** Le serveur retourne une erreur ou ne reconnaît pas les données

**Solution actuelle :**
- Le code utilise maintenant `application/x-www-form-urlencoded` (comme les formulaires HTML)
- Format : `root=value&username=value&password=value`

### 3. Cookies/Sessions non envoyés

**Symptôme :** La connexion fonctionne mais la session n'est pas maintenue

**Solution :**
- Le code inclut `credentials: "include"` pour envoyer les cookies
- Vérifiez que le serveur accepte les cookies depuis votre domaine

## Comment déboguer

### Étape 1 : Ouvrir la console du navigateur
- Appuyez sur `F12` ou `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
- Allez dans l'onglet "Console"

### Étape 2 : Tester le login
1. Remplissez le formulaire
2. Cliquez sur "Sign in"
3. Regardez les logs dans la console

### Étape 3 : Vérifier les logs

Vous devriez voir :
```
Sending login request: { root: "...", username: "...", password: "***" }
Response status: 200
Response ok: true/false
Response text: "..."
```

### Étape 4 : Analyser les erreurs

#### Si vous voyez "Network error" :
- Vérifiez votre connexion internet
- Vérifiez que l'URL est correcte
- Vérifiez les paramètres CORS du serveur

#### Si vous voyez "CORS error" :
- Le serveur ne permet pas les requêtes depuis votre domaine
- Solution : Utiliser un proxy backend ou demander au serveur d'autoriser votre domaine

#### Si le statut est 200 mais ça ne fonctionne pas :
- Vérifiez le contenu de "Response text"
- Le serveur peut retourner une page HTML avec un message d'erreur
- Ajustez la logique de détection du succès dans le code

## Test avec le formulaire HTML original

Pour comparer, testez avec ce code HTML :

```html
<form id="loginForm" action="https://b2b.goldentkts.com/index.php/login/post" method="post">
    <input type="text" name="root" placeholder="Enter Root" required>
    <input type="text" name="username" placeholder="Enter Username" required>
    <input type="password" name="password" placeholder="Enter Password" required>
    <button type="submit">Login</button>
</form>
```

Si ça fonctionne en HTML mais pas en React, c'est probablement un problème CORS.

## Solutions alternatives

### Option 1 : Utiliser un proxy backend
Créez un endpoint sur votre serveur qui fait le proxy vers l'API :

```javascript
// Sur votre backend
app.post('/api/login', async (req, res) => {
  const response = await fetch('https://b2b.goldentkts.com/index.php/login/post', {
    method: 'POST',
    body: new URLSearchParams(req.body),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  const data = await response.text()
  res.send(data)
})
```

### Option 2 : Utiliser le formulaire HTML caché
Le code inclut déjà un formulaire HTML caché. Vous pouvez l'utiliser comme solution de secours.

### Option 3 : Vérifier les en-têtes du serveur
Le serveur doit retourner ces en-têtes pour autoriser CORS :
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: Content-Type
Access-Control-Allow-Credentials: true
```

## Informations à fournir pour le débogage

Si le problème persiste, fournissez :
1. Le message d'erreur exact de la console
2. Le statut HTTP de la réponse
3. Le contenu de "Response text"
4. Une capture d'écran de l'onglet Network dans les DevTools
