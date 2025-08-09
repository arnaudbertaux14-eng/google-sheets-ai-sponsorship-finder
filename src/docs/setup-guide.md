📋 Guide d'installation détaillé
Prérequis

✅ Compte Google (Gmail)
✅ Clé API OpenAI
✅ Navigateur web moderne

🔑 Étape 1 : Obtenir votre clé API OpenAI

Allez sur platform.openai.com
Créez un compte ou connectez-vous
Allez dans "API Keys" dans le menu
Cliquez "Create new secret key"
⚠️ IMPORTANT : Copiez et sauvegardez cette clé (elle commence par sk-)

📊 Étape 2 : Créer votre Google Sheets

Allez sur sheets.google.com
Cliquez "Blank" pour créer un nouveau tableur
Renommez-le (ex: "Recherche Mécènes IA")

⚙️ Étape 3 : Ajouter le script

Dans Google Sheets : Extensions > Apps Script
Supprimez le code par défaut
Copiez tout le code depuis src/main.gs de ce repository
Collez-le dans l'éditeur
Ctrl+S pour sauvegarder
Nommez votre projet (ex: "Sponsorship Finder")

🔧 Étape 4 : Configurer la clé API

Dans Apps Script, sauvegardez avec Ctrl+S
Retournez dans Google Sheets
Rafraîchissez la page (F5)
Un nouveau menu "🔍 Recherche RSE" apparaît
Cliquez : 🔍 Recherche RSE > ⚙️ Configurer clé API
Collez votre clé OpenAI
Cliquez "OK"

📋 Étape 5 : Créer l'onglet "Paramètres"

Créez un nouvel onglet nommé "Paramètres"
Configurez comme suit :

Ligne 1 (en-têtes) :
ABCDEFGetc.Critère 1Description AssociationCritère 2Critère 3.........MAX_ENTREPRISES
Ligne 4 (étiquettes) :
ABCDEFGMSecteur d'activitéDescription AssociationLocalisationTaille entreprise.........Nombre max
Ligne 5 (vos critères) :
ABCDEFGMTechnologie, Santé[Votre description]Paris, LyonPME, ETI.........10
⚠️ Important : La description de votre association va en B5, le nombre max d'entreprises en M5
📝 Étape 6 : Créer l'onglet "Prompt"

Créez un nouvel onglet nommé "Prompt"
Structure :

ABprompt_systemeTu es un assistant spécialisé dans la recherche d'entreprises pour le mécénat. Description de l'association : ${DESCRIPTION_ASSOCIATION}. Réponds uniquement en français et au format JSON structuré.recherche_entrepriseTrouve ${MAX_ENTREPRISES} entreprises qui pourraient être intéressées par un mécénat avec les critères suivants : [vos critères]...recherche_contactPour cette entreprise : ${contexte_entreprise}, trouve les contacts clés...
🧪 Étape 7 : Premier test

Cliquez : 🔍 Recherche RSE > 🏢 Recherche d'entreprises
Patientez (30-60 secondes)
Vérifiez l'onglet "Résultat" qui se crée automatiquement

✅ Vérifications

 Menu "🔍 Recherche RSE" visible
 Clé API configurée
 Onglet "Paramètres" avec description en B5
 Onglet "Prompt" avec les 3 prompts
 Test réussi avec résultats

🆘 Dépannage
Erreur "Clé API manquante"

Reconfigurez : 🔍 Recherche RSE > ⚙️ Configurer clé API

Erreur "Onglet Paramètres introuvable"

Vérifiez l'orthographe exacte : "Paramètres"

Erreur "Prompt manquant"

Vérifiez les noms : prompt_systeme, recherche_entreprise, recherche_contact

Pas de résultats

Vérifiez vos critères (pas trop restrictifs)
Consultez les logs : Extensions > Apps Script > Execution transcript

💡 Conseils

Commencez petit : 5-10 entreprises max au début
Testez vos prompts progressivement
Surveillez les coûts API (affichés après chaque recherche)
Sauvegardez vos configurations

📞 Support
Si vous rencontrez des problèmes, créez une issue sur GitHub avec :

Description du problème
Captures d'écran si possible
Messages d'erreur complets
