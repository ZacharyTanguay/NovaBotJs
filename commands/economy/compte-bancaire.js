// #region Imports
// Créer par Discord
const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, AttachmentBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ComponentType } = require("discord.js")
// Base de données
const { User } = require("../../Database/Schema/user.js")
const { CompteBancaire } = require("../../Database/Schema/compte_bancaire.js")
const { fetchUser } = require("../../Database/Mongoose.js")
// Fonctions
const { moneyFormat, canvas_applyText, numberWithSpaces } = require("../../utils/functions.js")
// Assets
const custom = require("../../BotJson/myVar.json")
// Autres
const wait = require('node:timers/promises').setTimeout;
const Canvas = require('@napi-rs/canvas');
const { readFile } = require('fs/promises');
const { bouton_afficherCompteBancaire_accueil } = require("../economy/utils/buttons")
const { embed_créerCompteBancaire, embed_afficherCompteBancaire } = require("../economy/utils/embeds")
const { canvas_afficherCompteBancaire } = require("../economy/utils/canvas")
const { function_créerCompteBancaire, function_déposerCompteBancaire } = require("../economy/utils/functions")
// #endregion

// #region module exports
module.exports = {
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
    // #endregion

    async execute(interaction) {
        try {
            // Sous-commande -> Créer un compte bancaire
            if (interaction.options.getSubcommand() === 'créer') {
                const user = interaction.options.getUser("joueur")
                const userData = await fetchUser(user)
                function_créerCompteBancaire(user, userData, interaction)
            }

            // Sous-commande -> Afficher un compte bancaire
            if (interaction.options.getSubcommand() === 'afficher') {
                //#region Récupération des données
                const user = interaction.options.getUser("joueur") || interaction.member.user
                const userData = await fetchUser(user)
                const compteBancaireData = await CompteBancaire.findOne({ id: userData.id })
                //#endregion

                //#region Création du canvas pour l'affichage du compte bancaire
                const canvas = Canvas.createCanvas(930, 530);
                const context = canvas.getContext('2d');
                const background = await Canvas.loadImage('../../NovaBotJs/images/NovaFive_ATM.png');
                await canvas_afficherCompteBancaire(canvas, context, background, compteBancaireData)
                const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'compteBancaire.png' })
                //#endregion

                let message = await interaction.reply({ embeds: [embed_afficherCompteBancaire()], files: [attachment], ephemeral: true });
                await interaction.editReply({ components: [bouton_afficherCompteBancaire_accueil(user.id, message.id)] });

                const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, time: 60000, errors: ['time'] });

                // Quand un bouton est cliqué
                collector.on("collect", async (buttonInteraction) => {
                    // Si le bouton cliqué est le bouton "Dépôt"
                    if (buttonInteraction.customId === user.id + message.id + " déposerButton") {
                        function_déposerCompteBancaire(buttonInteraction, message.id)
                    }

                    // Si le bouton cliqué est le bouton "Retrait"
                    if (buttonInteraction.customId === message.id + "retirerButton") {
                        
                    }
                }); collector.on("end", (collected) => {
                    const embed_deconnecter = new EmbedBuilder()
                        .setColor("#cfb35f")
                        .setDescription(
                            `${custom.emoji_valid} Vous avez été déconnecté de votre compte bancaire.`
                        )
                    console.log(`Collected ${collected.size} clicks`); interaction.editReply({ embeds: [embed_deconnecter], files: [], components: [] });
                });
            }
        } catch (error) {
            interaction.followUp(`Une erreur est survenue: ${error}`)
            console.error(error)
        }
    },
};