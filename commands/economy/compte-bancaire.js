// #region Imports
// Créer par Discord
const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, AttachmentBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ComponentType } = require("discord.js")
// Base de données
const { User } = require("../../Database/Schema/user.js")
const { CompteBancaire } = require("../../Database/Schema/compte_bancaire.js")
const { fetch_user, create_compteBancaire } = require("../../Database/Mongoose.js")
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
const { function_créerCompteBancaire } = require("../economy/utils/functions")
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

    // #region exécution de la commande
    async execute(interaction) {
        try {
            if (interaction.options.getSubcommand() === 'créer') {
                const user = interaction.options.getUser("joueur")
                const userData = await fetch_user(user)
                function_créerCompteBancaire(user, userData, interaction)
            }

            // #region Sous-commande -> Créer un compte bancaire
            if (interaction.options.getSubcommand() === 'afficher') {
                const user = interaction.options.getUser("joueur") || interaction.member.user
                const userData = await fetch_user(user)
                const compteBancaireData = await CompteBancaire.findOne({ id: userData.id })
                //#region Création du canvas pour l'affichage du compte bancaire
                const canvas = Canvas.createCanvas(930, 530);
                const context = canvas.getContext('2d');
                const background = await Canvas.loadImage('../../NovaBotJs/images/NovaFive_ATM.png');
                await canvas_afficherCompteBancaire(canvas, context, background, compteBancaireData)
                const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'compteBancaire.png' })
                //#endregion
                let message = await interaction.reply({ embeds: [embed_afficherCompteBancaire()], files: [attachment], ephemeral: true });
                //const message = interaction.fetchReply() // Récupère le message envoyé par le bot
                await interaction.editReply({ components: [bouton_afficherCompteBancaire_accueil(user.id, message.id)] });
                const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, time: 60000, errors: ['time'] });
                collector.on("collect", async (buttonInteraction) => {
                    if (buttonInteraction.customId === user.id + message.id + "déposerButton") {
                        try {
                            const modal = new ModalBuilder()
                                .setCustomId(message.id + 'déposerModal')
                                .setTitle('Gestion de votre compte bancaire')

                            const déposerInput = new TextInputBuilder()
                                .setCustomId(message.id + 'déposerInput')
                                .setLabel('Montant à déposer')
                                .setPlaceholder('Entrez le montant à déposer')
                                .setStyle(TextInputStyle.Short)

                            const déposerActionRow = new ActionRowBuilder().addComponents(déposerInput)
                            modal.addComponents(déposerActionRow)
                            await buttonInteraction.showModal(modal)
                            const modalAwait = await buttonInteraction.awaitModalSubmit({ time: 60000, errors: ['time'], filter: i => i.user.id === buttonInteraction.user.id, fetchReply: true })
                            const montantDéposer = modalAwait.fields.getTextInputValue(message.id + 'déposerInput')

                            const embed_déposer = new EmbedBuilder()
                                .setColor("#cfb35f")
                                .setDescription(
                                    `${custom.emoji_valid} Vous avez déposé **${montantDéposer} $** sur votre compte bancaire.`
                                )
                            await modalAwait.deferUpdate()
                            await buttonInteraction.editReply({ embeds: [embed_déposer], files: [], components: [] }) // Envoie un message de confirmation du dépôt
                        }
                        catch (error) {
                            // const embed_error = new EmbedBuilder ()
                            // .setColor(custom.color_error)
                            // .setDescription(
                            //     `${custom.emoji_error} Vous avez annulé l'opération.`
                            // )
                            // await buttonInteraction.editReply({ embeds:[embed_error], files: [], components: [] })
                            console.log(error)
                        }
                    }
                    if (buttonInteraction.customId === message.id + "retirerButton") {
                        try {
                            const modal = new ModalBuilder()
                                .setCustomId(message.id + 'retirerModal')
                                .setTitle('Gestion de votre compte bancaire')

                            const retirerInput = new TextInputBuilder()
                                .setCustomId(message.id + 'retirerInput')
                                .setLabel('Montant à retirer')
                                .setPlaceholder('Entrez le montant à retirer')
                                .setStyle(TextInputStyle.Short)

                            const retirerActionRow = new ActionRowBuilder().addComponents(retirerInput)
                            modal.addComponents(retirerActionRow)
                            buttonInteraction.showModal(modal)
                            const modalAwait = await buttonInteraction.awaitModalSubmit({ time: 60000, errors: ['time'], fetchReply: true })
                            const montantRetirer = modalAwait.fields.getTextInputValue(message.id + 'retirerInput')
                            const embed_retirer = new EmbedBuilder()
                                .setColor("#cfb35f")
                                .setDescription(
                                    `${custom.emoji_valid} Vous avez retirer **${montantRetirer} $** de votre compte bancaire.`
                                )
                            await modalAwait.deferUpdate()
                            await buttonInteraction.editReply({ embeds: [embed_retirer], files: [], components: [] })
                        }
                        catch (error) {
                            // const embed_error = new EmbedBuilder ()
                            // .setColor(custom.color_error)
                            // .setDescription(
                            //     `${custom.emoji_error} Vous avez annulé l'opération.`
                            // )
                            // await buttonInteraction.editReply({ embeds:[embed_error], files: [], components: [] })
                            console.log(error)
                        }
                    }
                });
                collector.on("end", (collected) => {
                    const embed_deconnecter = new EmbedBuilder()
                        .setColor("#cfb35f")
                        .setDescription(
                            `${custom.emoji_valid} Vous avez été déconnecté de votre compte bancaire.`
                        )
                    console.log(`Collected ${collected.size} clicks`); interaction.editReply({ embeds: [embed_deconnecter], files: [], components: [] });
                });
            }
        } catch (error) {
            console.error(error)
            return interaction.followUp(`Une erreur est survenue: ${error}`)
        }
    },
    //#endregion
};