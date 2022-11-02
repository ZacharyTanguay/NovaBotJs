const { Client, GatewayIntentBits, AttachmentBuilder, EmbedBuilder, Embed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
const { moneyFormat } = require('/workspace/NovaBotJs/Handlers/functions.js')
const myVar = require('/workspace/NovaBotJs/BotJson/myVar.json')
const User = require('/workspace/NovaBotJs/Database/userSchema.js')
const Citoyen = require('/workspace/NovaBotJs/Database/citoyenSchema.js')
const Entreprise = require('/workspace/NovaBotJs/Database/entrepriseSchema.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("information")
    .setDescription("Affiche les informations du compte discord d'un utilisateur")
    .addSubcommand(subcommand =>
        subcommand
        .setName("afficher")
        .setDescription("Affiche les informations de votre compte discord")
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName("privée")
        .setDescription("Affiche les informations privée du compte discord d'un utilisateur [MODÉRATEURS SEULEMENT]")
        .addUserOption(
            option => option
            .setName("utilisateur")
            .setDescription("L'utilisateur à afficher les informations")
            .setRequired(true)
        )
    ),
    run: async (interaction) => {
        if (interaction.options.getSubcommand()) {
            
        }

        const embed = new EmbedBuilder ()
        .setColor(myVar.color_server)
        .setDescription(`Cette commande est en cours de développement!`)

        return interaction.reply({
            embeds: [ embed ]
        })
    }
}