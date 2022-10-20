const { SlashCommandBuilder } = require("@discordjs/builders")
const { Client, GatewayIntentBits, AttachmentBuilder, EmbedBuilder, Embed } = require("discord.js")
const { User } = require("C:/NovaBotJs/models/userSchema.js")
const { Entreprise} = require("C:/NovaBotJs/models/entrepriseSchema.js")
const conf = require("C:/NovaBotJs/config/embed.json")
const { v4: uuidv4 } = require('uuid');

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
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName("info")
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
        const filter = {}
        const user = await User.find(filter)
        const entreprise = interaction.options.getString("nom")
        const entrepriseData = await Entreprise.findOne({ id: entreprise.id }) || new Entreprise({ id: entreprise.id })

        if (interaction.options.getSubcommand() === "créer") {
            entrepriseData.id = interaction.options.getString("nom")
            entrepriseData.nom = interaction.options.getString("nom")
            entrepriseData.type = interaction.options.getString("type")
            entrepriseData.nombreDeSalariéMaximum = interaction.options.getString("nombre-de-salarié-maximum")
            entrepriseData.couleur = interaction.options.getString("couleur")
            entrepriseData.logo = interaction.options.getString("logo")
            

            const créerEmbed = new EmbedBuilder()
            .setDescription(`L'entreprise ${entrepriseData.nom} a été créé avec succès`)
            .setColor(conf.accepter)
            .setFooter({text: conf.accepterTxt + "Entreprise créé"})

            await entrepriseData.save()
            await interaction.reply({ embeds: [créerEmbed] })
        }

        if (interaction.options.getSubcommand() === "supprimer") {
            const supprimerEmbed = new EmbedBuilder()
            .setDescription(`L'entreprise ${entrepriseData.nom} a été supprimé avec succès`)
            .setColor(conf.accepter)
            .setFooter({text: conf.accepterTxt + "Entreprise supprimé"})

            await Entreprise.deleteOne({ id: entrepriseData.id })
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
            const afficherEmbed = new EmbedBuilder()
            .setTitle(`${entrepriseData.nom}`)
            .setFields(
                { name: "Patron", value: `${entrepriseData.patron}` },
                { name: `${entrepriseData.nbEmploye}/${entrepriseData.nbMaxEmploye}${user.nom}`, value: `${entrepriseData.type}` },
            )

            await interaction.reply({ embeds: [afficherEmbed] })    
        }
    }
}