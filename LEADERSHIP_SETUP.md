# 👔 Guide de Configuration - Section Leadership

## ✅ Section créée avec succès !

La section Leadership a été créée et placée avant `TestimonialsSection` dans votre site.

---

## 📝 Informations à mettre à jour

Ouvrez le fichier : `src/components/LeadershipSection.jsx`

### Dans la constante `ceoData` (lignes 10-17), remplacez :

```javascript
const ceoData = {
  name: "CEO Name", // ⬅️ Remplacez par le nom réel
  title: "Chief Executive Officer", // ⬅️ Titre exact
  email: "ceo@goldentkts.com", // ⬅️ Email réel
  phone: "+964 750 454 7323", // ⬅️ Téléphone réel
  linkedin: "https://linkedin.com/in/ceo-profile", // ⬅️ URL LinkedIn complète
  photo: "/ceo-photo.jpg", // ⬅️ Nom du fichier photo
  bio: "Leading Golden Ticket since 2015...", // ⬅️ Bio personnalisée
}
```

---

## 📸 Ajouter la photo du CEO

1. **Placez la photo** dans le dossier `/public/`
   - Format recommandé : JPG ou PNG
   - Dimensions recommandées : 400x400px (carré)
   - Nom du fichier : `ceo-photo.jpg` (ou le nom que vous avez mis dans le code)

2. **Exemple :**
   ```
   /public/ceo-photo.jpg
   ```

3. **Si la photo n'existe pas**, un placeholder sera affiché automatiquement

---

## 🎨 Fonctionnalités de la section

### ✅ Carte CEO
- Photo avec badge d'honneur
- Nom et titre
- Bio personnalisée
- Coordonnées (Email, Téléphone, LinkedIn)
- Design avec hover effects

### ✅ Statistiques
- 3 cartes avec icônes :
  - Years Experience (9 ans)
  - Happy Clients (50,000)
  - Global Reach (50+ pays)

### ✅ Graphique de croissance
- Graphique animé montrant la croissance depuis 2015
- Animation au scroll
- Points interactifs avec valeurs
- Design cohérent avec le thème doré

---

## 🔗 Lien LinkedIn

Le lien LinkedIn est cliquable et s'ouvre dans un nouvel onglet.

**Format de l'URL LinkedIn :**
- ✅ Correct : `https://www.linkedin.com/in/username`
- ✅ Correct : `https://linkedin.com/in/username`
- ❌ Incorrect : `linkedin.com/in/username` (manque https://)

---

## 📊 Personnaliser les statistiques

Dans le tableau `stats` (lignes 20-24), vous pouvez modifier :

```javascript
const stats = [
  { 
    label: "Years Experience", 
    value: 9, // ⬅️ Modifiez la valeur
    icon: Award, 
    color: "text-golden-400" 
  },
  // ... autres stats
]
```

---

## 📈 Personnaliser le graphique

Dans le tableau `chartData` (lignes 27-34), modifiez les années et valeurs :

```javascript
const chartData = [
  { year: 2015, value: 1000 }, // ⬅️ Modifiez selon vos données
  { year: 2017, value: 5000 },
  // ... ajoutez plus de points si nécessaire
]
```

---

## 🎨 Design

La section utilise :
- ✅ Thème doré (`golden-400`) cohérent avec le site
- ✅ Animations Framer Motion
- ✅ Responsive (mobile et desktop)
- ✅ Effets hover sur les liens
- ✅ Graphique SVG animé

---

## 📍 Emplacement

La section apparaît dans cet ordre :
1. HeroSection
2. AboutSections
3. ServicesSlider
4. DestinationsSection
5. TestimonialsSection
6. **LeadershipSection** ⬅️ ICI
7. TestimonialsSection
8. RegisterLogin
9. CtaSection
10. Footer

---

## ✅ Checklist

- [ ] Mettre à jour le nom du CEO
- [ ] Mettre à jour le titre
- [ ] Mettre à jour l'email
- [ ] Mettre à jour le téléphone
- [ ] Mettre à jour le lien LinkedIn
- [ ] Ajouter la photo dans `/public/`
- [ ] Personnaliser la bio
- [ ] Ajuster les statistiques si nécessaire
- [ ] Ajuster les données du graphique si nécessaire

---

## 🚀 Test

Après avoir mis à jour les informations :
1. Redémarrez le serveur de développement (`npm run dev`)
2. Allez sur la page d'accueil
3. Scrollez jusqu'à la section "Meet Our CEO"
4. Vérifiez que toutes les informations sont correctes
5. Testez les liens (email, téléphone, LinkedIn)
6. Vérifiez que la photo s'affiche correctement

---

**Besoin d'aide ?** Consultez le code dans `src/components/LeadershipSection.jsx` pour plus de détails.
