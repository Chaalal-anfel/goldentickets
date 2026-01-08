# 📸 Propositions pour la Photo et Coordonnées du CEO

## ✅ Champ "Company Address" ajouté

Le champ "Company Address" a été ajouté au formulaire d'inscription. C'est un champ textarea qui permet de saisir l'adresse complète de l'entreprise.

---

## 📍 Options pour la Photo et Coordonnées du CEO

### **Option 1 : Section About (Recommandée) ⭐**

**Emplacement :** `src/components/about-section.jsx`

**Avantages :**
- Section déjà dédiée à la présentation de l'entreprise
- Visibilité élevée (apparaît tôt sur la page)
- Design cohérent avec le reste du site

**Implémentation suggérée :**
- Ajouter une carte CEO à droite de la section texte
- Photo du CEO avec nom, titre, et coordonnées
- Design élégant avec animation Framer Motion

**Exemple de structure :**
```jsx
<div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
  <div className="flex items-center gap-4">
    <img 
      src="/ceo-photo.jpg" 
      alt="CEO" 
      className="w-24 h-24 rounded-full object-cover"
    />
    <div>
      <h4 className="font-semibold text-lg">[Nom du CEO]</h4>
      <p className="text-golden-400">Chief Executive Officer</p>
      <p className="text-sm text-gray-600">Email: ceo@goldentkts.com</p>
      <p className="text-sm text-gray-600">Phone: +964 XXX XXX XXXX</p>
    </div>
  </div>
</div>
```

---

### **Option 2 : Footer (Alternative)**

**Emplacement :** `src/components/footer.jsx`

**Avantages :**
- Toujours visible en bas de page
- Section "Contact Us" déjà présente
- Peut remplacer ou compléter les informations de contact

**Implémentation suggérée :**
- Ajouter une colonne "Leadership" ou "Meet Our CEO"
- Photo + coordonnées dans la 4ème colonne ou nouvelle colonne
- Design discret mais professionnel

**Exemple de structure :**
```jsx
<motion.div variants={childVariant}>
  <h3 className="text-white text-lg font-medium mb-6">Leadership</h3>
  <div className="flex flex-col items-center">
    <img 
      src="/ceo-photo.jpg" 
      alt="CEO" 
      className="w-20 h-20 rounded-full object-cover mb-3"
    />
    <h4 className="text-white font-semibold">[Nom du CEO]</h4>
    <p className="text-golden-400 text-sm mb-2">CEO</p>
    <p className="text-gray-400 text-xs">ceo@goldentkts.com</p>
    <p className="text-gray-400 text-xs">+964 XXX XXX XXXX</p>
  </div>
</motion.div>
```

---

### **Option 3 : Section dédiée "Leadership" (Premium)**

**Emplacement :** Nouveau composant `src/components/LeadershipSection.jsx`

**Avantages :**
- Section entièrement dédiée au leadership
- Peut inclure plusieurs membres de l'équipe
- Plus d'espace pour présenter l'équipe

**Implémentation suggérée :**
- Nouvelle section entre "About" et "Services"
- Design avec grille pour plusieurs membres
- Photo, nom, titre, bio courte, coordonnées

**Structure suggérée :**
- Créer `src/components/LeadershipSection.jsx`
- Ajouter dans `App.jsx` après `AboutSections`

---

### **Option 4 : Hero Section (Bold)**

**Emplacement :** `src/components/HeroSection.jsx`

**Avantages :**
- Visibilité maximale (première chose vue)
- Impact visuel fort
- Peut être intégré de manière subtile

**Implémentation suggérée :**
- Badge ou carte flottante avec photo et coordonnées
- Positionné en overlay sur l'image hero
- Design moderne et discret

---

## 🎨 Recommandation Finale

**Je recommande l'Option 1 (Section About)** car :
1. ✅ Contexte parfait (section "About Us")
2. ✅ Visibilité élevée sans être intrusif
3. ✅ Design cohérent avec le reste du site
4. ✅ Facile à implémenter

---

## 📝 Informations nécessaires

Pour implémenter, j'aurai besoin de :
- **Photo du CEO** : Format JPG/PNG, dimensions recommandées 400x400px (carré)
- **Nom complet du CEO**
- **Titre exact** (ex: "Chief Executive Officer", "Founder & CEO", etc.)
- **Email du CEO**
- **Téléphone du CEO**
- **Autres coordonnées** (LinkedIn, etc.) - optionnel

---

## 🚀 Prochaines étapes

1. Choisissez l'option qui vous convient le mieux
2. Fournissez les informations du CEO
3. Placez la photo dans le dossier `/public/` (ex: `/public/ceo-photo.jpg`)
4. Je pourrai alors implémenter la solution choisie

---

**Note :** Toutes les options peuvent être combinées ou modifiées selon vos préférences !
