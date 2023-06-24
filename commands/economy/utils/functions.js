//#region Imports
const { embed_compteBancaireExiste, embed_créerCompteBancaire, embed_créerCompteBancaireConfirmation, embed_carteIdentiteExistePas } = require("./embeds")

// Importation des schémas de données
const { CompteBancaire } = require("../../../Database/Schema/compte_bancaire.js")
//#endregion

// --------------------------------------------------------------------
// Fonctions commande -> Compte bancaire
// --------------------------------------------------------------------
//#region
async function function_créerCompteBancaire(user, userData, interaction) {
    try {
        if (userData === null) {
            return interaction.reply({ embeds: [embed_carteIdentiteExistePas(user)], ephemeral: true })
        }
        if (await CompteBancaire.findOne({ id: user.id })) {
            return interaction.reply({ embeds: [embed_compteBancaireExiste(user)], ephemeral: true })
        } else {
            const compteBancaireData = new CompteBancaire({ id: user.id }) // Ajout du compte bancaire dans la base de données
            function_initCompteBancaire(user, compteBancaireData)
            await interaction.reply({ embeds: [embed_créerCompteBancaire(userData, compteBancaireData)], ephemeral: true })
            await interaction.followUp({ embeds: [embed_créerCompteBancaireConfirmation(user)] })
        }
    } catch (error) {
        console.log("Une erreur c'est produite lors de l'exécution de function_créerCompteBancaire" + error)
    }
}

async function function_initCompteBancaire(user, compteBancaireData) {
    try {
        compteBancaireData.userTag = user.tag
        compteBancaireData.iban = Math.floor(Math.random() * (99999999 - 10000000)) + 10000000
        compteBancaireData.codeSecret = Math.floor(Math.random() * (999999 - 100000)) + 100000
        compteBancaireData.codeCarte = Math.floor(Math.random() * (9999 - 1000)) + 1000
        compteBancaireData.argent_propre = 10000
        compteBancaireData.save();
    } catch (error) {
        console.log("Une erreur c'est produite lors de l'exécution de la function_initCompteBancaire" + error)
    }
}
//#endregion

// --------------------------------------------------------------------
// Fonctions commande -> Compte bancaire
// --------------------------------------------------------------------
//#region
//#endregion

//#region Exports
module.exports = {
    function_créerCompteBancaire
}
//#endregion