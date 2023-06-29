//#region Imports
const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, AttachmentBuilder, ComponentType } = require("discord.js")
const { fetchUser, fetchCompteBancaire } = require("../../database/request")
//#endregion

module.exports = {
    //#region data
    data: new SlashCommandBuilder()
        // Commande principale -> Compte bancaire
        .setName('compte-bancaire')
        .setDescription('affiche un compte bancaire')
        // Sous-commande -> Créer un compte bancaire
        .addSubcommand(subcommand => subcommand
            .setName('créer')
            .setDescription('Crée un compte bancaire')
            .addUserOption(option => option.setName('joueur').setDescription('joueur dont le compte bancaire doit être créé').setRequired(true)))
        // Sous-commande -> Afficher un compte bancaire
        .addSubcommand(subcommand => subcommand
            .setName('afficher')
            .setDescription('Affiche un compte bancaire')
            .addUserOption(option => option.setName('joueur').setDescription('joueur dont le compte bancaire doit être affiché'))),
    //#endregion

    async execute(interaction) {

    }
}