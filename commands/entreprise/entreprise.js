const { SlashCommandBuilder, TimestampStyles } = require("@discordjs/builders")
const { Client, GatewayIntentBits, AttachmentBuilder, EmbedBuilder, Embed } = require("discord.js")
const { User } = require("C:/NovaBotJs/models/userSchema.js")
const { Entreprise} = require("C:/NovaBotJs/models/entrepriseSchema.js")
const conf = require("C:/NovaBotJs/config/embed.json")
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

uuidv4();

module.exports = {
    data: new SlashCommandBuilder()
    .setName("entreprise")
    .setDescription("gère les entreprises")
    .addSubcommand(subcommand =>
        subcommand
        .setName("créer")
        .setDescription("Crée ou modifie une entreprise")
        .addStringOption(
            option => option
            .setName("nom")
            .setDescription("Le nom de l'entreprise")
            .setRequired(true)
        )
        .addStringOption(
            option => option
            .setName("type")
            .setDescription("Le type de l'entreprise")
            .addChoices(
                { name: "Entreprise publique", value: "Entreprise publique" },
                { name: "Entreprise privée", value: "Entreprise privée" },
                { name: "Organisation", value: "Organisation" },
                { name: "Gang", value: "Gang" },
                )
            .setRequired(true)
        )
        .addStringOption(
            option => option
            .setName("nombre-de-salarié-maximum")
            .setDescription("Le nombre de salarié maximum autorisé dans l'entreprise")
            .setRequired(true)
        )
        .addStringOption(
            option => option
            .setName("couleur")
            .setDescription("La couleur affiché sur les messages communiqués par l'entreprise")
        )
        .addStringOption(
            option => option
            .setName("logo")
            .setDescription("le lien de l'image qui servira de logo à l'entreprise")
        )
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName("supprimer")
        .setDescription("Supprime une entreprise")
        .addStringOption(
            option => option
            .setName("nom")
            .setDescription("Le nom de l'entreprise")
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName("modifier")
        .setDescription("Modifie une entreprise")
        .addStringOption(
            option => option
            .setName("nom")
            .setDescription("Le nom de l'entreprise")
            .setRequired(true)
        )
        .addStringOption(
            option => option
            .setName("type")
            .setDescription("Le type de l'entreprise")
            .addChoices(
                { name: "Entreprise publique", value: "Entreprise publique" },
                { name: "Entreprise privée", value: "Entreprise privée" },
                { name: "Organisation", value: "Organisation" },
                { name: "Gang", value: "Gang" },
                )
        )
        .addStringOption(
            option => option
            .setName("nombre-de-salarié-maximum")
            .setDescription("Le nombre de salarié maximum autorisé dans l'entreprise")
        )
        .addStringOption(
            option => option
            .setName("couleur")
            .setDescription("La couleur affiché sur les messages communiqués par l'entreprise")
        )
        .addStringOption(
            option => option
            .setName("logo")
            .setDescription("le lien de l'image qui servira de logo à l'entreprise")
        )
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName("afficher")
        .setDescription("Affiche les informations d'une entreprise")
        .addStringOption(
            option => option
            .setName("nom")
            .setDescription("Le nom de l'entreprise")
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName("liste")
        .setDescription("Affiche la liste des entreprises")
    ),
    run: async (interaction) => {
        const user = interaction.member.user
        userData = await User.findOne({ id: user.id }) || new User({ id: user.id })
        
        if (interaction.options.getSubcommand() === "créer") {
            if (await Entreprise.findOne({ nom: interaction.options.getString("nom") })) {
                const existeEmbed = new EmbedBuilder()
                .setDescription(`${userData.prénom} + Cette entreprise existe déjà`)
                .setColor(conf.mauvais)

                return interaction.reply({ embeds: [existeEmbed] , ephemeral: true })
            }

            const entrepriseData = new Entreprise({
                nom : interaction.options.getString("nom"),
                type : interaction.options.getString("type"),
                possesseur : interaction.user.id,
                nombreDeSalariéMaximum : interaction.options.getString("nombre-de-salarié-maximum"),
                createdAt : moment(Date.now()).format("DD/MM/YYYY"),
                couleur : interaction.options.getString("couleur"),
                logo : interaction.options.getString("logo")
            })

            const créerEmbed = new EmbedBuilder()
            .setDescription(`L'entreprise ${entrepriseData.nom} a été créé avec succès`)
            .setColor(conf.accepter)
            .setFooter({text: conf.accepterTxt + "Entreprise créé"})

            await entrepriseData.save()
            await interaction.reply({ embeds: [créerEmbed] })
        }

        if (interaction.options.getSubcommand() === "supprimer") {
            if (!await Entreprise.findOne({ nom: interaction.options.getString("nom") })) {
                return interaction.reply({ content: "Cette entreprise n'existe pas", ephemeral: true })
            }
            const entrepriseData = await Entreprise.findOne({ nom: interaction.options.getString("nom") })
            await Entreprise.deleteOne({ nom: interaction.options.getString("nom") })
            
            const supprimerEmbed = new EmbedBuilder()
            .setDescription(`L'entreprise ${entrepriseData.nom} a été supprimé avec succès`)
            .setColor(conf.accepter)
            .setFooter({text: conf.accepterTxt + "Entreprise supprimé"})
            
            await interaction.reply({ embeds: [supprimerEmbed] })
        }

        if (interaction.options.getSubcommand() === "modifier") {
            entrepriseData.nom = interaction.options.getString("nom")
            entrepriseData.type = interaction.options.getString("type")
            entrepriseData.nombreDeSalariéMaximum = interaction.options.getString("nombre-de-salarié-maximum")
            entrepriseData.couleur = interaction.options.getString("couleur")
            entrepriseData.logo = interaction.options.getString("logo")
            await entrepriseData.save()

            const modifierEmbed = new EmbedBuilder()
            .setDescription(`L'entreprise ${entrepriseData.nom} a été modifié avec succès`)
            .setColor(conf.accepter)
            .setFooter({text: conf.accepterTxt + "Entreprise modifié"})

            await interaction.reply({ embeds: [modifierEmbed] })
        }

        if (interaction.options.getSubcommand() === "afficher") {
            entrepriseData = await Entreprise.findOne({ nom: interaction.options.getString("nom") })
            const afficherEmbed = new EmbedBuilder()
            .setTitle(`${entrepriseData.nom} + `)
            .setFields(
                { name: "Patron", value: `${entrepriseData.patron}` },
                { name: `${entrepriseData.nbEmploye}/${entrepriseData.nbMaxEmploye}`, value: `${entrepriseData.type}` },
            )

            await interaction.reply({ embeds: [afficherEmbed] })    
        }
    }
}