//#region Imports
const { embed_compteBancaireExiste, embed_créerCompteBancaire, embed_créerCompteBancaireConfirmation, embed_carteIdentiteExistePas, embed_déposerCompteBancaire } = require("./embeds")
const { EmbedBuilder, AttachmentBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ComponentType } = require("discord.js")

// Importation des schémas de données
const { CompteBancaire } = require("../../../Database/Schema/compte_bancaire.js")
//#endregion

// --------------------------------------------------------------------
// Fonctions commande -> Compte bancaire
// --------------------------------------------------------------------
//#region
async function function_créerCompteBancaire(user, userData, interaction) {
    try {
        if (userData.carte_identite_vrai === false) {
            return interaction.reply({ embeds: [embed_carteIdentiteExistePas(user)], ephemeral: true })
        }
        if (await CompteBancaire.findOne({ id: user.id })) {
            return interaction.reply({ embeds: [embed_compteBancaireExiste(user)], ephemeral: true })
        } else {
            const compteBancaireData = new CompteBancaire({ id: user.id }) // Ajout du compte bancaire dans la base de données
            function_initCompteBancaire(user, compteBancaireData) // Initialisation du compte bancaire
            await interaction.reply({ embeds: [embed_créerCompteBancaire(userData, compteBancaireData)], ephemeral: true })
            await interaction.followUp({ embeds: [embed_créerCompteBancaireConfirmation(user)] })
            await user.send({ embeds: [embed_créerCompteBancaire(userData, compteBancaireData)] })
        }
    } catch (error) {
        console.log("L'erreur suivante c'est produite lors de l'appel de function_créerCompteBancaire :")
        console.error(error)
    }
}

async function function_initCompteBancaire(user, compteBancaireData) {
    try {
        compteBancaireData.userTag = user.tag
        compteBancaireData.iban = "LS" + Math.floor(Math.random() * (99999999 - 10000000)) + 10000000
        compteBancaireData.codeSecret = Math.floor(Math.random() * (999999 - 100000)) + 100000
        compteBancaireData.codeCarte = Math.floor(Math.random() * (9999 - 1000)) + 1000
        compteBancaireData.argent_propre = 10000
        compteBancaireData.save();
    } catch (error) {
        console.log("L'erreur suivante c'est produite lors de l'appel de function_initCompteBancaire :")
        console.error(error)
    }
}

async function function_déposerCompteBancaire(buttonInteraction, messageId) {
    try {
        const modal = new ModalBuilder()
            .setCustomId(messageId + 'déposerModal')
            .setTitle('Gestion de votre compte bancaire')

        const déposerInput = new TextInputBuilder()
            .setCustomId(messageId + 'déposerInput')
            .setLabel('Montant à déposer')
            .setPlaceholder('Entrez le montant à déposer')
            .setStyle(TextInputStyle.Short)

        const déposerActionRow = new ActionRowBuilder().addComponents(déposerInput)
        modal.addComponents(déposerActionRow)
        await buttonInteraction.showModal(modal)
        const modalAwait = await buttonInteraction.awaitModalSubmit({
            time: 60000,
            errors: ['time'],
            filter: i => i.user.id === buttonInteraction.user.id,
            fetchReply: true
        })
        const montantDéposer = modalAwait.fields.getTextInputValue(messageId + 'déposerInput')
        await modalAwait.deferUpdate()
        await buttonInteraction.editReply({ embeds: [embed_déposerCompteBancaire(montantDéposer)], files: [], components: [] })
    } catch (error) {
        console.log("L'erreur suivante c'est produite lors de l'appel de function_déposerCompteBancaire : \n")
        console.error(error)
    }
}

async function function_retirerCompteBancaire(buttonInteraction, messageId) {
    try {
        const modal = new ModalBuilder()
            .setCustomId(messageId + 'retirerModal')
            .setTitle('Gestion de votre compte bancaire')

        const retirerInput = new TextInputBuilder()
            .setCustomId(messageId + 'retirerInput')
            .setLabel('Montant à retirer')
            .setPlaceholder('Entrez le montant à retirer')
            .setStyle(TextInputStyle.Short)

        const retirerActionRow = new ActionRowBuilder().addComponents(retirerInput)
        modal.addComponents(retirerActionRow)
        buttonInteraction.showModal(modal)
        const modalAwait = await buttonInteraction.awaitModalSubmit({ time: 60000, errors: ['time'], fetchReply: true })
        const montantRetirer = modalAwait.fields.getTextInputValue(messageId + 'retirerInput')
        const embed_retirer = new EmbedBuilder()
            .setColor("#cfb35f")
            .setDescription(
                `${custom.emoji_valid} Vous avez retirer **${montantRetirer} $** de votre compte bancaire.`
            )
        await modalAwait.deferUpdate()
        await buttonInteraction.editReply({ embeds: [embed_retirer], files: [], components: [] })
    } catch (error) {
        console.log("L'erreur suivante c'est produite lors de l'appel de function_test : \n")
        console.error(error)
    }
}
//#endregion

// --------------------------------------------------------------------
// Fonctions commande -> Amende
// --------------------------------------------------------------------
//#region

//#endregion

//#region Exports
module.exports = {
    function_créerCompteBancaire,
    function_déposerCompteBancaire,
}
//#endregion