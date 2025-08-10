
# 🎯 Mécène Finder – Google Sheet + OpenAI

Un script **Google Apps Script** qui aide les associations à **identifier et suivre leurs mécènes potentiels** directement dans **Google Sheets** grâce à l’API OpenAI.  
Il automatise la recherche d’entreprises alignées avec vos valeurs RSE et récupère leurs **contacts clés**.

---

## 📸 Aperçu
[Aperçu du Google Sheet - onglet "Contact Linkedin"](docs/Onglet Paramètres.png)  
[Aperçu du Google Sheet - onglet "Contact Linkedin"](docs/Onglet Résultat.png)  
[Aperçu du Google Sheet - onglet "Contact Linkedin"](docs/Onglet Prompt.png)  
[Aperçu du Google Sheet - onglet "Contact Linkedin"](docs/Onglet Contact Linkedin.png)  

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
