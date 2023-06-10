const { SlashCommandBuilder } = require("@discordjs/builders")
const { Client, GatewayIntentBits, AttachmentBuilder, EmbedBuilder, Embed } = require("discord.js")
const { User } = require("../../models/userSchema.js")
const Canvas = require('@napi-rs/canvas');
const { request } = require('undici');

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 3,
    minimumSignificantDigits: 3,
  });

module.exports = {
    data: new SlashCommandBuilder()
    .setName("carte-identié")
    .setDescription("crée une carte d'identité")
    .addSubcommand(subcommand =>
        subcommand
        .setName("créer")
        .setDescription("crée une carte d'identité")
        .addUserOption(
            option => option
            .setName("user")
            .setDescription("utilisateur dont les informations doivent être créer")
            .setRequired(true)
        )
        .addStringOption(
            option => option
            .setName("prénom")
            .setDescription("prénom de l'utilisateur")
            .setRequired(true)
        )
        .addStringOption(
            option => option
            .setName("nom")
            .setDescription("prénom de l'utilisateur")
            .setRequired(true)
        )
        .addStringOption(
            option => option
            .setName("age")
            .setDescription("age de l'utilisateur")
            .setRequired(true)
        )
        .addStringOption(
            option => option
            .setName("sexe")
            .setDescription("sexe de l'utilisateur")
            .addChoices(
                { name: "Homme", value: "Homme" },
                { name: "Femme", value: "Femme" },
                )
            .setRequired(true)
        )
        .addStringOption(
            option => option
            .setName("date-de-naissance")
            .setDescription("date-de-naissance de l'utilisateur")
            .setRequired(true)
        )
        .addStringOption(
            option => option
            .setName("lieu-de-naissance")
            .setDescription("lieu-de-naissance de l'utilisateur")
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName("suprimer")
        .setDescription("supprime une carte d'identité")
        .addUserOption(
            option => option
            .setName("user")
            .setDescription("utilisateur dont les informations doivent être affichée")
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName("afficher")
        .setDescription("affiche une carte d'identité")
        .addUserOption(
            option => option
            .setName("user")
            .setDescription("utilisateur dont les informations doivent être affichée")
        )
    ),
    async execute (interaction) {
        const user = interaction.options.getUser("user") || interaction.member.user
        const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })
        if (interaction.options.getSubcommand() === "créer") {
            const user = interaction.options.getUser("user")
            const prénom = interaction.options.getString("prénom")
            const nom = interaction.options.getString("nom")
            const age = interaction.options.getString("age")
            const sexe = interaction.options.getString("sexe")
            const dateDeNaissance = interaction.options.getString("date-de-naissance")
            const lieuDeNaissance = interaction.options.getString("lieu-de-naissance")

            userData.prénom = prénom
            userData.nom = nom
            userData.age = age
            userData.sexe = sexe
            userData.dateDeNaissance = dateDeNaissance
            userData.lieuDeNaissance = lieuDeNaissance
            userData.carteIdentité = true
            userData.save()

            interaction.reply("carte d'identité créer avec succès")
        }

        if (interaction.options.getSubcommand() === "suprimer") {
            if (userData.carteIdentité === true) {
                userData.prénom = ""
                userData.nom = ""
                userData.sexe = ""
                userData.dateDeNaissance = ""
                userData.lieuDeNaissance = ""
                userData.carteIdentité = false
                userData.save()

                interaction.reply("carte d'identité supprimer avec succès")
            } else {
                interaction.reply("l'utilisateur n'a pas de carte d'identité")
            }
        }

        if (interaction.options.getSubcommand() === "afficher") {
            const applyText = (canvas, text) => {
                const user = interaction.options.getUser("user")
                const context = canvas.getContext('2d');
            
                // Declare a base size of the font
                let fontSize = 50;
            
                do {
            context.fillStyle = '#000000';
                    context.font = `${fontSize -= 10}px sans-serif bold`;
                } while (context.measureText(text).width > canvas.width - 300);
            
                return context.font;
            };
    
            const canvas = Canvas.createCanvas(1100, 1100);
            const context = canvas.getContext('2d');
            const background = await Canvas.loadImage('C:/NovaBotJs/images/carte-identite.png');
            context.drawImage(background, 0, 0 , canvas.width, canvas.height);
            const { body } = await request(user.displayAvatarURL({ extension: 'jpg' }));
            const avatar = await Canvas.loadImage(await body.arrayBuffer());
            context.drawImage(avatar, 85, 450, 250, 250);
            
            context.font = applyText(canvas, `${formatter.format(userData.banque)}`);
            context.fillStyle = '#000000';
            context.fillText("NOM : " + userData.nom, 385, 450);
            context.fillText("PRÉNOM : " + userData.prénom, 385, 520);
            context.fillText("SEXE : " + userData.sexe, 385, 590);
            context.fillText("ÂGE : " + userData.age, 385, 660);
            context.fillText("DATE DE NAISSANCE : " + userData.dateDeNaissance, 385, 730);
            context.fillText("LIEU DE NAISSANCE : " + userData.lieuDeNaissance, 385, 800);

            context.clip();
            
            
            const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });

            const embedAfficherIdentite = new EmbedBuilder ()
            .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL()})
            .setColor("#E67E22")
            .setImage("attachment://profile-image.png")

            if (userData.carteIdentité == true) {
                await interaction.reply({embeds: [embedAfficherIdentite], files: [attachment] })
            } else {
                await interaction.reply("vous n'avez pas de carte d'identité")
            }
        }
    }
}