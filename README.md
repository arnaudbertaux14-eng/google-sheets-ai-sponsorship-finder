# 🎯 Mécène Finder – Google Sheet + OpenAI

Un script **Google Apps Script** qui aide les associations à **identifier et suivre leurs mécènes potentiels** directement dans **Google Sheets** grâce à l’API OpenAI.  
Il automatise la recherche d’entreprises alignées avec vos valeurs RSE et récupère leurs **contacts clés**.

---
## 🌍 Contexte et enjeux

Pour beaucoup d’associations, **trouver des mécènes** est un processus long, incertain et chronophage.  
Les principaux défis rencontrés sont :  
- 📉 Manque de visibilité sur les entreprises susceptibles de soutenir leur cause  
- ⏳ Temps perdu à identifier les bons interlocuteurs dans les organisations  
- 📑 Données éparses et difficilement exploitables  
- 🔍 Difficulté à démontrer l’alignement entre les valeurs de l’association et la stratégie RSE des entreprises  

---

## 💡 Valeur ajoutée de Mécène Finder

Cette solution simplifie et accélère la prospection en :  
- **Automatisant** la recherche d’entreprises alignées sur vos critères  
- **Identifiant** rapidement les décideurs pertinents (RSE, direction, RH…)  
- **Structurant** les informations directement dans un Google Sheet exploitable  
- **Réduisant** le temps de recherche de plusieurs jours à quelques minutes  
- **Maximisant** les chances de succès en ciblant les entreprises les plus compatibles

En s’appuyant sur l’API OpenAI, l’outil exploite de grandes quantités d’informations publiques pour fournir des résultats **pertinents, clairs et exploitables**.

---

## 📸 Aperçu

- [Aperçu du Google Sheet - onglet "Contact Linkedin"](docs/Onglet Paramètres.png)  
- [Aperçu du Google Sheet - onglet "Contact Linkedin"](docs/Onglet Résultat.png)  
- [Aperçu du Google Sheet - onglet "Contact Linkedin"](docs/Onglet Prompt.png)  
- [Aperçu du Google Sheet - onglet "Contact Linkedin"](docs/Onglet Contact Linkedin.png)  
- Vidéo de démonstration pour l'utilisation de l'outil : https://www.loom.com/share/2f74474b0627467d9ba008783b2d2432?sid=0cd3e4fc-754e-492b-828c-c7525a962899
---

## 🚀 Fonctionnalités

- 🔍 **Recherche d’entreprises** : identifie les sociétés alignées avec vos critères RSE.
- 👥 **Recherche de contacts** : extrait les noms, fonctions et coordonnées des interlocuteurs pertinents.
- 📊 **Résultats organisés** : données structurées directement dans un onglet `Résultat`.
- ⚙️ **Configuration simple** : clé API OpenAI stockée dans les paramètres du script.
- 💰 **Estimation du coût** : calcule le coût estimé de chaque recherche via l’API OpenAI.
- 📂 **Prompts personnalisables** : adaptez facilement les requêtes à vos besoins.

---

## 📁 Structure du projet

```plaintext
src/
  docs/         → Guides et documentation
  examples/     → Prompts d'exemple
  main.gs       → Code principal Apps Script
```
## 📖 Documentation
- 📜 Guide d’installation : src/docs/setup-guide.md
- 💬 Prompts d’exemple : src/examples/
- 🖼 Captures d’écran : src/docs/
- 📖 Fichier excel à ouvrir dans Google Sheet : src/docs/

## ⚡ Installation rapide
Ouvrir un nouveau Google Sheet
Aller dans Extensions → Apps Script
Coller le contenu de main.gs
Sauvegarder, puis recharger la feuille
Utiliser le menu "🔍 Recherche RSE" qui apparaît
Configurer votre clé API OpenAI via "⚙️ Configurer clé API"
💡 La clé API commence par sk- et peut être générée depuis votre compte OpenAI.

## 🛠 Utilisation
Configurer l’onglet "Paramètres" avec :
La description de votre association
Vos critères de recherche
Le nombre maximum d’entreprises à analyser
Configurer l’onglet "Prompt" avec :
prompt_systeme
recherche_entreprise
recherche_contact
Lancer la recherche :
🏢 Recherche d'entreprises → Trouve les entreprises pertinentes
👥 Recherche de contacts → Trouve les contacts clés
Consulter les résultats dans l’onglet Résultat

## 📜 Licence
Ce projet est sous licence MIT. Vous êtes libre de l’utiliser, le modifier et le partager.

## 🤝 Contribution
Les contributions sont les bienvenues !
Ouvrir une issue pour signaler un bug ou proposer une fonctionnalité
Soumettre une pull request pour des améliorations

---

## Choix du modèle d'IA

Ce projet utilise le modèle **`gpt-4o-mini-search-preview-2025-03-11`** pour analyser et classer les données de recherche de mécènes.  

### Pourquoi ce modèle ?
- **Rapide et économique** : temps de réponse réduit, idéal pour un usage fréquent dans Google Sheets.  
- **Optimisé pour la recherche et le filtrage** : trie efficacement les organisations selon vos critères (secteur, engagement RSE, taille, etc.).  
- **Précis sur des données internes** : fonctionne très bien lorsque les informations de base (entreprises, contacts, etc.) sont déjà dans votre tableur.  
- **Coût ultra-compétitif** : environ **0,1 centime d’euro** pour analyser **10 entreprises**.  

### Comparaison rapide

| Critère                     | GPT-4/5 standard                         | Deep Search (approche)                                     | GPT-4o-mini-search-preview |
|-----------------------------|----------------------------------------|------------------------------------------------------------|----------------------------|
| **Vitesse**                 | Moyenne                                | Lente (requêtes web)                                       | **Rapide**                 |
| **Coût estimé (10 entr.)**  | Variable                               | Variable                                                   | **≈ 0,001 €**               |
| **Qualité des réponses**    | Très haute                             | Dépend des sources trouvées                                | Haute                      |
| **Recherche web**           | Non (sauf intégration spécifique)      | Oui                                                        | Non (sauf intégration spécifique)   |
| **Idéal pour**              | Analyses complexes, rapports détaillés | Veille documentaire en ligne                               | **Filtrage & scoring local** |

### En résumé
Si vos données sont déjà disponibles dans le Google Sheet, **`gpt-4o-mini-search-preview`** est le meilleur choix pour un traitement rapide, efficace et à coût très faible.  
Une approche **Deep Search** pourrait être envisagée si vous souhaitez étendre la recherche à Internet en temps réel.  
Le **GPT-4/5 standard** reste pertinent pour des analyses stratégiques plus poussées ou des livrables détaillés.  
