const { EmbedBuilder } = require("discord.js")
const custom = require("../../../BotJson/myVar.json")

// --------------------------------------------------------------------
// Embeds commande -> Compte bancaire
// --------------------------------------------------------------------
//#region
const embed_carteIdentiteExistePas = function get(user) {
    try {
        return new EmbedBuilder()
            .setColor(custom.color_deny)
            .setDescription(`${custom.emoji_deny} Vous n'avez pas de carte d'identité **${user.tag}**`)
    } catch (error) {
        console.error(error)
    }
}

const embed_compteBancaireExiste = function get(user) {
    try {
        return new EmbedBuilder()
            .setColor(custom.color_deny)
            .setDescription(`${custom.emoji_deny} Vous avez déjà un compte bancaire **${user.tag}**`)
    } catch (error) {
        console.error(error)
    }
}

const embed_créerCompteBancaire = function get(userData, compteBancaireData) {
    try {
        return new EmbedBuilder()
            .setColor(custom.color_server)
            .setThumbnail(`https://static.wikia.nocookie.net/gtawiki/images/0/08/PacificStandardBank-GTAV-Logo.png/revision/latest?cb=20160921165509`)
            .setTitle(`Ouverture de votre compte bancaire`)
            .setDescription(
                `Mme/M. ${userData.nom} \n\n` +
                `:bank:・Nous vous souhaitons la bienvenue chez \`Pacific Bank\` ! \n\n` +
                `:moneybag:・Le solde de votre compte a été crédité de **10 000$**. \n\n` +
                `:label:・ Votre IBAN est **${compteBancaireData.iban}**. Vos concitoyens pourront vous transférer de l'argent via cet identifiant. \n\n` +
                `:mobile_phone:・Voici votre code secret pour accéder à votre compte, ne le partagez à personne : **${compteBancaireData.codeSecret}**. \n\n` +
                `:credit_card:・Voici votre code de carte bancaire : __${compteBancaireData.codeCarte}__.`
            )
            .setFooter({ text: `Cordialement, la Pacific Standard Public Deposit Bank` })
            .setTimestamp()
    } catch (error) {
        console.error(error)
    }
}

const embed_créerCompteBancaireConfirmation = function get(user) {
    return new EmbedBuilder()
        .setColor(custom.color_valid)
        .setDescription(
            `${custom.emoji_valid} Votre compte bancaire a été créé **${user.tag}.** \n`
        )
}

const embed_afficherCompteBancaire = function get() {
    return new EmbedBuilder()
        .setColor("#cfb35f")
        .setImage("attachment://compteBancaire.png")
}
//#endregion

module.exports = {
    embed_carteIdentiteExistePas,
    embed_compteBancaireExiste,
    embed_créerCompteBancaire,
    embed_créerCompteBancaireConfirmation,
    embed_afficherCompteBancaire,
}