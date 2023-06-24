const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js")

//#region Boutons de la commande compte-bancaire
// Page du code secret a rentrer pour accéder au compte bancaire.
const bouton_codeSecret_0_4 = function get(messageId) {
    return new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder() // Création du bouton 4
        .setCustomId(messageId + '4')
        .setLabel('4')
        .setStyle(ButtonStyle.Secondary), // Secondary = gris

        new ButtonBuilder() // Création du bouton 3
        .setCustomId(messageId + '3')
        .setLabel('6')
        .setStyle(ButtonStyle.Secondary), // Secondary = gris

        new ButtonBuilder() // Création du bouton 2
        .setCustomId(messageId + '2')
        .setLabel('2')
        .setStyle(ButtonStyle.Secondary), // Secondary = gris

        new ButtonBuilder() // Création du bouton 1
        .setCustomId(messageId + '1')
        .setLabel('1')
        .setStyle(ButtonStyle.Secondary), // Secondary = gris
        
        new ButtonBuilder() // Création du bouton 0
        .setCustomId(messageId + '0')
        .setLabel('0')
        .setStyle(ButtonStyle.Secondary) // Secondary = gris
        )
}

const bouton_codeSecret_5_9 = function get(messageId) {
    return new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder() // Création du bouton 9
        .setCustomId(messageId + '9')
        .setLabel('9')
        .setStyle(ButtonStyle.Secondary), // Secondary = gris

        new ButtonBuilder() // Création du bouton 8
        .setCustomId(messageId + '8')
        .setLabel('8')
        .setStyle(ButtonStyle.Secondary), // Secondary = gris

        new ButtonBuilder() // Création du bouton 7
        .setCustomId(messageId + '7')
        .setLabel('7')
        .setStyle(ButtonStyle.Secondary), // Secondary = gris

        new ButtonBuilder() // Création du bouton 6
        .setCustomId(messageId + '6')
        .setLabel('6')
        .setStyle(ButtonStyle.Secondary), // Secondary = gris

        new ButtonBuilder() // Création du bouton 5
        .setCustomId(messageId + '5')
        .setLabel('5')
        .setStyle(ButtonStyle.Secondary), // Secondary = gris
    )
}

const bouton_afficherCompteBancaire_accueil = function get(userId, messageId) {
    try {
        return new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder() // Création du bouton Dépôt
            .setCustomId(userId + messageId + 'déposerButton')
            .setLabel('Dépôt')
            .setStyle(ButtonStyle.Success), // Success = vert
    
            new ButtonBuilder() // Création du bouton Retrait
            .setCustomId(userId + messageId + 'retirerButton')
            .setLabel('Retrait')
            .setStyle(ButtonStyle.Danger), // Danger = rouge
    
            new ButtonBuilder() // Création du bouton Gérer
            .setCustomId(userId + messageId + 'gérerButton')
            .setLabel('Gérer')
            .setStyle(ButtonStyle.Secondary), // Secondary = gris
    
            new ButtonBuilder() // Création du bouton Autres
            .setCustomId(userId + messageId + 'autresButton')
            .setLabel('Autres')
            .setStyle(ButtonStyle.Secondary) // Secondary = gris
        )
    } catch (error) {
        console.trace('Erreur dans la fonction bouton_afficherCompteBancaire_accueil')
        console.error(error)
    }
}

const bouton_afficherCompteBancaire_gérer = function get(messageId) {
    return new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder() // Création du bouton Compte
        .setCustomId(messageId + ' Bouton précédent')
        .setLabel('Précédent')
        .setStyle(ButtonStyle.Primary), // Success = bleu

        new ButtonBuilder() // Création du bouton Gérer
        .setCustomId(messageId + ' Bouton Mode de connexion')
        .setLabel('Mode de connexion')
        .setStyle(ButtonStyle.Secondary), // Secondary = gris

        new ButtonBuilder() // Création du bouton Autres
        .setCustomId(messageId + 'codeSecretButton')
        .setLabel('Changer le code secret')
        .setStyle(ButtonStyle.Secondary) // Secondary = gris
    )
}


//#endregion

module.exports = {
    bouton_codeSecret_0_4,
    bouton_codeSecret_5_9,
    bouton_afficherCompteBancaire_accueil,
}