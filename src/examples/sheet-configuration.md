# 📊 Configuration Google Sheet - Exemple Concret

## Votre Onglet "Paramètres" - Structure Exacte

Basé sur votre configuration actuelle pour une association anti-gaspillage textile :

### Ligne 1 (En-têtes des colonnes)
| A | B | C | D | E | F | G | H | I | J | K | L |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **Variable ⚙️** | **Description Association** | **Valeurs-clés** | **Domaines RSE** | **Type mécénat** | **Géographie** | **Partenaires** | **Secteurs** | **Taille** | **Sources** | **Motifs refus** | **Nombre** |

### Ligne 5 (Vos valeurs - Exemple textile)
| A | B | C | D | E | F | G | H | I | J | K | L |
|---|---|---|---|---|---|---|---|---|---|---|---|
| - | Association qui lutte contre le gaspillage textile en récoltant des vêtements en France | réduction des déchets | Gestion responsable des ressources naturelles | Financier | Lyon | LCL | tout secteur d'activité | ETI | https://annuaire-entreprises.data.gouv.fr/ | - | **8** |

## 🎯 Exemples d'Autres Configurations

### Association d'aide à l'enfance
| A | B | C | D | E | F | G | H | I | J | K | L |
|---|---|---|---|---|---|---|---|---|---|---|---|
| - | Association qui accompagne les enfants en difficulité scolaire par du soutien personnalisé | éducation, inclusion, égalité des chances | éducation et formation, solidarité et lutte contre l'exclusion | Financier, de compétences | Paris, Marseille | Fondation Orange | éducation, tech, banque | PME, ETI | LinkedIn, presse locale | budget clos pour 2024 | **15** |

### Association sportive inclusive
| A | B | C | D | E | F | G | H | I | J | K | L |
|---|---|---|---|---|---|---|---|---|---|---|---|
| - | Club de football qui développe le sport adapté pour personnes en situation de handicap | inclusion, sport, égalité des chances | sport et inclusion, égalité et diversité | Financier, en nature, visibilité | Toulouse et région | Décathlon, Mairie Toulouse | sport, santé, grande distribution | PME, ETI, Grands groupes | FFH, sites municipaux | pas de visibilité suffisante | **12** |

## 🔍 Variables Automatiquement Disponibles dans vos Prompts

Grâce à votre configuration, ces variables sont automatiquement disponibles :

```
${Description Association} → "Association qui lutte contre le gaspillage textile..."
${Valeurs-clés de l'association} → "réduction des déchets"
${Domaines d'engagement RSE recherchés} → "Gestion responsable des ressources naturelles"
${Type de mécénat souhaité} → "Financier"
${Critères géographiques} → "Lyon"
${Entreprises déjà partenaires} → "LCL"
${Secteurs d'activité ciblés} → "tout secteur d'activité"
${Taille d'entreprise visée} → "ETI"
${Sources de recherche} → "https://annuaire-entreprises.data.gouv.fr/"
${Motifs de refus fréquents} → "" (vide)
${MAX_ENTREPRISES} → 8
${DESCRIPTION_ASSOCIATION} → "Association qui lutte contre le gaspillage textile..."
```
## Onglet "Résultat" (15 colonnes)
**🔄 Flux de Données**

1️⃣ Recherche Entreprises

Lit : Onglet "Paramètres" (colonnes A-L)
Utilise : Prompt "recherche_entreprise"
Remplit : Colonnes A-G de "Résultat"

2️⃣ Recherche Contacts

Lit : Colonnes A-G de "Résultat" (infos entreprises)
Utilise : Prompt "recherche_contact"
Remplit : Colonnes H-O de "Résultat"
| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Nom de l’entreprise 🚀 | Localisation (siège + antennes) 🌎 | Ville de l’association la plus proche 🏙️ | Site web officiel 🌐 | Lien(s) vers des contenus alignés avec les valeurs 🌐 | Résumé des actions RSE identifiées 📢 | Exemples d'associations déjà soutenues | Nom et fonction d’un contact RSE 🙋 | Nom du dirigeant / fondateur 🙋 | Email / téléphone générique ou spécifique✉️ | Nom du responsable RH 🙋 | Score d’alignement IA (optionnel) 🏆 | Source ou justification de l’information ℹ️ | Commentaires divers : ℹ️ | Variable ⚙️ | Contact Linkedin | 
|Dénomination exacte de la société identifiée | Ville(s) principales d’implantation | Ville du réseau Marraine & Vous la plus proche | Lien direct vers la page d’accueil de l’entreprise | Articles, pages RSE, communiqués, rapports, etc. | Description synthétique des engagements sociétaux | Autres structures mécénées mentionnées | Responsable RSE, mécénat ou fondation interne | Pour les approches personnalisées | Moyen de contact (public) | Pour les approches personnalisées | Score de 0 à 100 selon la pertinence détectée par l’IA | Lien vers la page ou document source | | Description | Formule pour rechercher un contact Linkedin à partir de votre export dans l'onglet "Contact Linkedin" |
|Texte | Ville(s), code postal | Nom de ville | URL | Liste de liens | Texte libre ou puce | Liste (nom + lien si possible) | Texte | Texte | Email ou numéro | Texte | Score numérique | URL | | Format attendu | Prénom + Nom | 
|Doit permettre la recherche ultérieure | Pour le matching territorial | Pour faciliter les mises en relation locales | Sert pour exploration plus poussée | Pour justifier l’alignement valeurs | Clé pour évaluer la pertinence | Peut aider à identifier ouverture ou thématique | Idéalement avec lien LinkedIn ou mail | Surtout utile pour PME/ETI | Préférence pour un contact dédié RSE si dispo | Surtout utile pour les grandes entreprises | Synthèse utile pour trier/prioriser | Pour auditabilité et preuve | | Commentaire | Vous devez d'abord faire un extrait de vos contacts Linkedin |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|



