// Configuration et fonctions principales
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

function getOpenAiApiKey() {
  const apiKey = PropertiesService.getScriptProperties().getProperty('OPENAI_API_KEY');
  if (!apiKey) {
    throw new Error('Clé API OpenAI manquante. Utilisez le menu pour la configurer.');
  }
  return apiKey;
}

function setOpenAiApiKey() {
  const apiKey = Browser.inputBox('Configuration de la clé API', 'Entrez votre clé API OpenAI (elle commence par "sk-") :', Browser.Buttons.OK_CANCEL);
  if (apiKey && apiKey !== 'cancel') {
    PropertiesService.getScriptProperties().setProperty('OPENAI_API_KEY', apiKey);
    Browser.msgBox('Succès !', 'Clé API OpenAI configurée avec succès !', Browser.Buttons.OK);
  }
}

// Fonction pour lire les paramètres depuis l'onglet "Paramètres"
function lireParametres() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Paramètres');
  if (!sheet) {
    throw new Error('Onglet "Paramètres" introuvable');
  }
  
  const data = sheet.getDataRange().getValues();
  const params = {};
  const criteres = data[0];
  // Boucle pour lire les critères des colonnes
  for (let col = 0; col < criteres.length; col++) {
    if (criteres[col]) {
      const valeurs = [];
      for (let row = 4; row <= 19; row++) {
        if (row < data.length && data[row][col]) {
          valeurs.push(data[row][col]);
        }
      }
      params[criteres[col]] = valeurs.join(', ') || '';
    }
  }
  // NOUVEAU : Lire la description de l'association depuis la cellule B5
  const descriptionAssociation = sheet.getRange('B5').getValue();
  params['DESCRIPTION_ASSOCIATION'] = descriptionAssociation || 'Association à but non lucratif';

  // Lire la valeur de la cellule M5 (décalée à cause de la nouvelle colonne)
  const maxEntreprisesValue = sheet.getRange('M5').getValue();
  // Ajoute la valeur au dictionnaire des paramètres.
  // Si M5 est vide ou n'est pas un nombre, une valeur par défaut de 20 sera utilisée.
  params['MAX_ENTREPRISES'] = !isNaN(maxEntreprisesValue) && maxEntreprisesValue > 0 ? parseInt(maxEntreprisesValue, 10) : 20;

  return params;
}

/**
 * Lit les templates de prompts depuis l'onglet "Prompt".
 * @returns {Object} Un objet où les clés sont les identifiants des prompts et les valeurs sont les textes des prompts.
 */
function lirePrompts() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Prompt');
  if (!sheet) {
    throw new Error('Onglet "Prompt" introuvable. Veuillez le créer et le configurer.');
  }
  
  const data = sheet.getRange(1, 1, sheet.getLastRow(), 2).getValues();
  const prompts = {};
  
  for (const row of data) {
    const key = row[0];
    const value = row[1];
    if (key && value) {
      prompts[key] = value;
    }
  }
  
  return prompts;
}

/**
 * Remplace les placeholders dans un template de prompt.
 * @param {string} template - Le texte du prompt avec des placeholders comme ${key}.
 * @param {Object} replacements - Un objet de remplacements, ex: { key: "valeur" }.
 * @returns {string} Le prompt formaté.
 */
function formaterPrompt(template, replacements) {
  let prompt = template;
  for (const key in replacements) {
    const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
    prompt = prompt.replace(regex, replacements[key]);
  }
  return prompt;
}

/**
 * MODIFIÉ : Accepte maintenant le prompt système en argument.
 * @param {string} userPrompt - Le prompt de l'utilisateur.
 * @param {string} systemPrompt - Le prompt système.
 * @returns {string} La réponse de l'API.
 */
function appelOpenAI(userPrompt, systemPrompt) {
  const apiKey = getOpenAiApiKey();
  
  const payload = {
    // Modèle recommandé : "gpt-4o-mini" (rapide et très performant/économique)
    model: "gpt-4o-mini-search-preview-2025-03-11",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
   // temperature: 0.2,
    max_tokens: 16384,
    // Indispensable pour que le modèle retourne du JSON valide
    //response_format: { type: "json_object" } 
  };
  
  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  
  const response = UrlFetchApp.fetch(OPENAI_API_URL, options);
  const responseCode = response.getResponseCode();
  const responseText = response.getContentText();
  
  if (responseCode !== 200) {
    console.error('Erreur API OpenAI:', responseText);
    throw new Error(`Erreur de l'API OpenAI (code ${responseCode}): ${responseText}`);
  }

  const responseData = JSON.parse(responseText);
  if (responseData.choices && responseData.choices[0]) {
    // MODIFIÉ : La fonction retourne maintenant uniquement la chaîne de texte du contenu.
    return responseData.choices[0].message.content;
  } else {
    throw new Error('Réponse API invalide ou inattendue.');
  }
}

// Fonction pour écrire les résultats dans l'onglet "Résultat"
function ecrireResultats(data, type) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName('Résultat');
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet('Résultat');
    // MODIFIÉ : On étend la plage de A4:L4 à A4:N4 et on ajoute le nouvel en-tête
    sheet.getRange("A4:N4").setValues([['Nom Entreprise', 'Localisation', 'Ville Association Proche', 'Site Web', 'Contenus Alignés', 'Résumé RSE', 'Associations Soutenues', 'Nom et Fonction (Contact)', 'Nom Dirigeant', 'Contact (Email/Tél)', 'Nom RDH','Score Alignement', 'Source/Justification', 'Commentaires divers']]).setFontWeight('bold');
  }
  
  if (type === 'entreprises') {
    sheet.getRange(5, 1, sheet.getMaxRows() - 4, 7).clearContent();
    const rows = data.slice(0, sheet.getMaxRows() - 4).map(e => [
      e.nom || '', e.localisation || '', e.ville_association_proche || '',
      e.site_web || '', (e.contenus_alignes || []).join('\n'), e.resume_rse || '',
      (e.associations_soutenues || []).join('\n')
    ]);
    if (rows.length > 0) {
      sheet.getRange(5, 1, rows.length, 7).setValues(rows).setWrap(true);
    }
  } else if (type === 'contacts') {
    // MODIFIÉ : On efface sur 6 - >7 colonnes au lieu de 5 pour inclure la nouvelle
    sheet.getRange(5, 8, sheet.getMaxRows() - 4, 7).clearContent();
    
    const rows = data.slice(0, sheet.getMaxRows() - 4).map(c => [
      c.nom_fonction_rse || '', 
      c.nom_dirigeant || '', 
      c.contact || '',
      c.nom_drh || '', // MODIFIÉ : On ajoute la nouvelle donnée ici
      c.score_alignement || '', 
      c.source_justification || '',
      c.commentaires_divers || '' // MODIFIÉ : On ajoute la nouvelle donnée ici
    ]);
    if (rows.length > 0) {
      // MODIFIÉ : On écrit sur 6->7 colonnes au lieu de 5
      sheet.getRange(5, 8, rows.length, 7).setValues(rows).setWrap(true);
    }
  }
}

// BOUTON 1 : Recherche d'entreprises (avec Loggers)
function rechercheEntreprises() {
  try {
    const params = lireParametres();
    Browser.msgBox('Recherche en cours...', `Veuillez patienter pendant la recherche de ${params['MAX_ENTREPRISES']} entreprises.`, Browser.Buttons.OK);
   
    const prompts = lirePrompts();
   
    if (!prompts.recherche_entreprise || !prompts.prompt_systeme) {
      throw new Error("Un ou plusieurs prompts sont manquants dans l'onglet 'Prompt'. Vérifiez la présence de 'recherche_entreprise' et 'prompt_systeme'.");
    }
    const replacements = { ...params };
   
    const userPrompt = formaterPrompt(prompts.recherche_entreprise, replacements);
    
    // MODIFIÉ : On formate aussi le prompt système avec les paramètres
    const systemPrompt = formaterPrompt(prompts.prompt_systeme, replacements);

    // =================================================================
    // ✅ LOGGER 1 : VOIR CE QUI ENTRE DANS L'API
    // Affiche le prompt utilisateur final qui sera envoyé à ChatGPT.
    Logger.log("--- PROMPT UTILISATEUR ENVOYÉ À L'IA ---");
    Logger.log(userPrompt);
    Logger.log("--- PROMPT SYSTÈME ENVOYÉ À L'IA ---");
    Logger.log(systemPrompt);
    // =================================================================
    const reponse = appelOpenAI(userPrompt, systemPrompt);
    // ✅ NOUVELLE LIGNE : On calcule et on affiche le coût estimé
    const coutEstime = estimerCoutAppel(systemPrompt, userPrompt, reponse);
    Logger.log(`---> Coût estimé pour cette recherche : $${coutEstime.toFixed(6)}`);
    // =================================================================
    // ✅ LOGGER 2 : VOIR CE QUI SORT DE L'API
    // Affiche la réponse brute reçue, avant toute tentative de conversion en JSON.
    Logger.log("--- RÉPONSE BRUTE REÇUE DE L'IA ---");
    Logger.log(reponse);
    // =================================================================
   
    let data;
    try {
      data = JSON.parse(reponse);
      Logger.log("--- data parser---");
      Logger.log(data);

    } catch (e) {
      const jsonMatch = reponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        data = JSON.parse(jsonMatch[0]);
      } else {
        console.error("Réponse brute de l'API (non-JSON) :", reponse);
        throw new Error('Format de réponse invalide. Consultez les logs pour plus de détails.');
      }
    }
   
    if (data.entreprises && data.entreprises.length > 0) {
      ecrireResultats(data.entreprises, 'entreprises');
      Browser.msgBox('Succès !', `${data.entreprises.length} entreprises trouvées et ajoutées dans l'onglet "Résultat".\nCoût estimé : $${coutEstime.toFixed(5)}`, Browser.Buttons.OK);
    } else {
      Browser.msgBox('Aucun résultat', 'Aucune entreprise trouvée avec les critères spécifiés.', Browser.Buttons.OK);
    }
   
  } catch (error) {
    console.error('Erreur recherche entreprises:', error);
    Browser.msgBox('Erreur', `Une erreur s'est produite : ${error.message}`, Browser.Buttons.OK);
  }
}

// BOUTON 2 : Recherche de contacts (avec Loggers ajoutés à la version originale)
function rechercheContacts() {
  try {
    let coutTotalEstime = 0;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Résultat');
    if (!sheet) {
      Browser.msgBox('Erreur', 'Onglet "Résultat" introuvable. Effectuez d\'abord une recherche d\'entreprises.', Browser.Buttons.OK);
      return;
    }
  
    // MODIFIÉ : On lit les 7 premières colonnes pour avoir toutes les infos de l'entreprise
    const entreprisesData = sheet.getRange(5, 1, sheet.getLastRow() - 4, 7).getValues();

    // MODIFIÉ : On transforme chaque ligne en un objet 'entreprise' complet
    const entreprises = entreprisesData.map(row => ({
      nom: row[0],
      localisation: row[1],
      site_web: row[3],
      resume_rse: row[5],
      associations_soutenues: row[6]
    })).filter(e => e.nom); // On garde seulement les lignes avec un nom
   
    if (entreprises.length === 0) {
      Browser.msgBox('Erreur', 'Aucune entreprise trouvée dans les résultats.', Browser.Buttons.OK);
      return;
    }
    
    const params = lireParametres(); // NOUVEAU : On lit les paramètres
    const prompts = lirePrompts();
    if (!prompts.recherche_contact || !prompts.prompt_systeme) {
        throw new Error("Un ou plusieurs prompts sont manquants dans l'onglet 'Prompt'. Vérifiez la présence de 'recherche_contact' et 'prompt_systeme'.");
    }
   
    Browser.msgBox('Recherche en cours...', `Recherche de contacts pour ${entreprises.length} entreprises. Cela peut prendre quelques minutes.`, Browser.Buttons.OK);
   
    const toutsContacts = [];
    const contactPromptTemplate = prompts.recherche_contact;
    // MODIFIÉ : On formate le prompt système avec les paramètres une seule fois
    const systemPrompt = formaterPrompt(prompts.prompt_systeme, params);
    
    for (const entreprise of entreprises) {
      try {
        // MODIFIÉ : On assemble toutes les infos dans une seule variable 'contexte'
        const contexteEntreprise = `
          - Nom : ${entreprise.nom}
          - Site Web : ${entreprise.site_web}
          - Localisation : ${entreprise.localisation}
          - Résumé de sa politique RSE : ${entreprise.resume_rse}
          - Associations déjà soutenues : ${entreprise.associations_soutenues}
        `;
        // MODIFIÉ : On passe ce contexte unique au prompt via le placeholder
        const userPrompt = formaterPrompt(contactPromptTemplate, { 
            contexte_entreprise: contexteEntreprise 
        });
       
        // =================================================================
        // ✅ LOGGER 1 : AFFICHE LE PROMPT ENVOYÉ À L'API
        Logger.log(`--- PROMPT ENVOYÉ POUR : ${entreprise.nom} ---`);
        Logger.log(userPrompt);
        // =================================================================
       
        const reponse = appelOpenAI(userPrompt, systemPrompt);
        // ✅ NOUVELLE LIGNE : On calcule le coût et on l'ajoute au total
        const coutEstimeAppel = estimerCoutAppel(systemPrompt, userPrompt, reponse);
        coutTotalEstime += coutEstimeAppel;
        // =================================================================
        // ✅ LOGGER 2 : AFFICHE LA RÉPONSE BRUTE REÇUE DE L'API
        Logger.log(`--- RÉPONSE REÇUE POUR : ${entreprise.nom} ---`);
        Logger.log(reponse);
        // =================================================================
       
        let dataContacts;
        try {
          dataContacts = JSON.parse(reponse);
        } catch (e) {
          const jsonMatch = reponse.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            dataContacts = JSON.parse(jsonMatch[0]);
          } else {
            console.warn(`Aucun JSON trouvé pour l'entreprise: ${entreprise.nom}`);
            toutsContacts.push({}); // Ajoute une ligne vide pour ne pas décaler les résultats
            continue;
          }
        }
       
        if (dataContacts.contacts && dataContacts.contacts.length > 0) {
          toutsContacts.push(dataContacts.contacts[0]);
        } else {
            toutsContacts.push({}); // Ajoute une ligne vide si aucun contact n'est trouvé
        }
       
        Utilities.sleep(1500);
       
      } catch (error) {
        console.error(`Erreur pour l'entreprise ${entreprise.nom}:`, error);
        toutsContacts.push({}); // Ajoute une ligne vide en cas d'erreur
        continue;
      }
    }
   
    if (toutsContacts.length > 0) {
      ecrireResultats(toutsContacts, 'contacts');
      Browser.msgBox('Succès !', `Recherche terminée. Les résultats sont dans l'onglet "Résultat". \nCoût total estimé : $${coutTotalEstime.toFixed(5)}`, Browser.Buttons.OK);
    } else {
      Browser.msgBox('Aucun contact', 'Aucun contact trouvé pour les entreprises listées.', Browser.Buttons.OK);
    }
   
  } catch (error) {
    console.error('Erreur recherche contacts:', error);
    Browser.msgBox('Erreur', `Une erreur s'est produite : ${error.message}`, Browser.Buttons.OK);
  }
}
    

// BOUTON 3 : Supprimer les résultats
function supprimerResultats() {
  try {
    const response = Browser.msgBox('Confirmation', 'Êtes-vous sûr de vouloir supprimer tous les résultats ?', Browser.Buttons.YES_NO);
    
    if (response === 'yes') {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Résultat');
      if (sheet) {
        sheet.getRange(5, 1, sheet.getMaxRows() - 4, 14).clearContent(); // passer de 12 à 14 colonnes à supprimer
        Browser.msgBox('Succès !', 'Tous les résultats ont été supprimés.', Browser.Buttons.OK);
      } else {
        Browser.msgBox('Information', 'Aucun résultat à supprimer.', Browser.Buttons.OK);
      }
    }
  } catch (error) {
    console.error('Erreur suppression:', error);
    Browser.msgBox('Erreur', `Une erreur s'est produite : ${error.message}`, Browser.Buttons.OK);
  }
}

/*
 * Estime le coût d'un appel API en se basant sur la longueur des textes.
 * @param {string} promptSysteme Le texte du prompt système.
 * @param {string} promptUtilisateur Le texte du prompt utilisateur.
 * @param {string} reponseTexte Le texte de la réponse reçue de l'IA.
 * @returns {number} Le coût estimé en dollars.
 */
function estimerCoutAppel(promptSysteme, promptUtilisateur, reponseTexte) {
  // Tarifs pour le modèle "gpt-4o-mini" (en dollars par million de tokens)
  // Vérifiez toujours les tarifs actuels sur le site d'OpenAI.
  const PRIX_INPUT_PAR_MILLION_TOKENS = 0.15;
  const PRIX_OUTPUT_PAR_MILLION_TOKENS = 0.60;
  
  // Règle d'estimation : 1 token ≈ 4 caractères
  const CARACTERES_PAR_TOKEN = 4;

  // 1. Calcul des tokens en entrée (input)
  const longueurInput = (promptSysteme || '').length + (promptUtilisateur || '').length;
  const tokensInput = longueurInput / CARACTERES_PAR_TOKEN;
  
  // 2. Calcul des tokens en sortie (output)
  const longueurOutput = (reponseTexte || '').length;
  const tokensOutput = longueurOutput / CARACTERES_PAR_TOKEN;
  
  // 3. Calcul du coût
  const coutInput = (tokensInput / 1000000) * PRIX_INPUT_PAR_MILLION_TOKENS;
  const coutOutput = (tokensOutput / 1000000) * PRIX_OUTPUT_PAR_MILLION_TOKENS;
  
  return coutInput + coutOutput;
}

// Fonction pour créer le menu personnalisé
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🔍 Recherche RSE')
    .addItem('🏢 Recherche d\'entreprises', 'rechercheEntreprises')
    .addItem('👥 Recherche de contacts', 'rechercheContacts')
    .addSeparator()
    .addItem('🗑️ Supprimer les résultats', 'supprimerResultats')
    .addSeparator()
    .addItem('⚙️ Configurer clé API', 'setOpenAiApiKey')
    .addToUi();
}
