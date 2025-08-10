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
## Onglet "Résultat" 
### 🔄 Flux de Données**

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

## Onglet "Prompts" 

| A | B | 
|---|---|
|recherche_entreprise |	"Tu agis comme un assistant expert en recherche de partenariats pour une association. Ton objectif est d’identifier ${MAX_ENTREPRISES} entreprises susceptibles de devenir partenaires mécènes de l’association, en t’appuyant sur une analyse multicritère.<br> Critères de sélection :<br> Les valeurs de l'entreprise doivent correspondre à :<br>${Valeurs-clés de l'association 🙋}<br> Leurs engagements en RSE doivent concerner au moins un de ces domaines : ${Domaines d'engagement RSE recherchés📢} <br>L’entreprise doit être en capacité de proposer un mécénat de type : ${Type de mécénat souhaité  💶} <br>Sa localisation (siège ou antennes) doit se situer à proximité des zones d’implantation de l’association : ${Critères géographiques 🌎}<br>Exclure les entreprises déjà partenaires listées ici : ${Entreprises déjà partenaires  🚀} <br>Les secteurs d’activité à privilégier sont : ${Secteurs d’activité ciblés 🏭} <br>La taille des entreprises recherchées est : ${Taille d’entreprise visée 🏭} <br>Sélectionne de préférence des entreprises familiales. <br>Sources recommandées : <br>Tu peux t’appuyer sur tes propres connaissances et recherches, et consulter prioritairement les sources suivantes : ${Sources de recherche 🌐}. <br>Données attendues pour chaque entreprise (maximum ${MAX_ENTREPRISES}) : <br>Réponds uniquement au format JSON ci-dessous, sans aucun texte supplémentaire : <br>{  ""entreprises"": [ <br>    { <br>      ""nom"": ""Nom exact de l'entreprise"", <br>      ""localisation"": ""Ville du siège + villes d’implantation (le cas échéant)"", <br>      ""ville_association_proche"": ""Nom de la ville du réseau Marraine & Vous la plus proche"", <br>      ""site_web"": ""URL du site officiel (page d’accueil)"", <br>      ""contenus_alignes"": [ <br>        ""Lien vers une page RSE, un rapport d'engagement, un communiqué ou autre contenu pertinent"", <br>        ""Autre lien pertinent (facultatif)"" <br> ], <br>      ""resume_rse"": ""Résumé synthétique des engagements RSE ou sociétaux"", <br>      ""associations_soutenues"": [""Nom d'une association ou d'une structure déjà mécénée identifiée""]  <br>    } <br>  ] <br>} <br>N’invente aucune information. Si une donnée n’est pas trouvable de manière fiable, laisse le champ vide ou indique ""non renseigné"". <br>La réponse doit être en ${Langue de recherche🈲}"|
|recherche_contact |	"Recherche les contacts RSE/mécénat pour l'entreprise, ci-dessous les informations sur l'entreprise : <br>${contexte_entreprise} <br>MISSION : Recherche les informations de contact les plus précises et à jour pour cette entreprise. <br>Trouve les informations suivantes : <br>- Nom et prénom du responsable RSE, (utiliser LinkedIn ou les rapports RSE parfois en PDF), <br>- Nom et prénom du Dirigeant ou fondateur (utiliser des sites comme societe.com et sirene.fr, <br>- Email du responsable RSE et du dirigeant et leur téléphone, portable de préférence, préférence pour un contact dédié RSE si disponible,  <br>- Nom et prénom du responsable ressources humaines et son email, <br>- Évalue l'alignement avec les valeurs de mécénat (score 0-100), <br>- Source ou justification de l’information, lien vers la page ou document source, <br>- Commentaires divers. <br>Réponds UNIQUEMENT au format JSON suivant : <br>{ <br>  ""contacts"": [ <br>    { <br>      ""nom_fonction_rse"": ""Nom et fonction du contact RSE"", <br>      ""nom_dirigeant"": ""Nom du dirigeant/fondateur"", <br>      ""contact"": ""Email ou téléphone"", <br>      ""nom_drh"": ""Nom du responsable ressources humaines et son email"", <br>      ""score_alignement"": 85, <br>      ""source_justification"": ""URL ou source de l'information"" <br>      ""commentaires_divers"": ""Commentaires divers"" <br>    } <br>  ] <br>}"|
prompt_systeme |	"Tu es un assistant spécialisé dans la recherche d'entreprises pour le mécénat. Tu travailles pour l'association qui a besoin de ton aide pour trouver des mécènes. <br>Description de l'association : ${DESCRIPTION_ASSOCIATION} <br>Réponds uniquement en français et au format JSON structuré."|

## Onglet "Contact Linkedin" 
### Ligne 4 :
| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
|First Name	| Last Name |	URL |	Email Address |	Company |	Position |	Connected On |
