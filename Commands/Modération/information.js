const {
  Client,
  GatewayIntentBits,
  AttachmentBuilder,
  EmbedBuilder,
  Embed,
} = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { moneyFormat } = require("/workspace/NovaBotJs/Handlers/functions.js");
const myVar = require("/workspace/NovaBotJs/BotJson/myVar.json");
const { User } = require("/workspace/NovaBotJs/Database/userSchema.js");
const { Citoyen } = require("/workspace/NovaBotJs/Database/citoyenSchema.js");
const {
  Entreprise,
} = require("/workspace/NovaBotJs/Database/entrepriseSchema.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("information")
    .setDescription(
      "Affiche les informations du compte discord d'un utilisateur"
    )
    .addSubcommandGroup((subcommandGroup) =>
      subcommandGroup
        .setName("utilisateur")
        .setDescription("SubcommandGroup Utilisateur")
        .addSubcommand((subcommand) =>
          subcommand
            .setName("créer")
            .setDescription(
              "Affiche les informations privée du compte discord d'un utilisateur"
            )
            .addUserOption((option) =>
              option
                .setName("utilisateur")
                .setDescription("L'utilisateur à afficher les informations")
                .setRequired(true)
            )
            .addStringOption((option) =>
              option
                .setName("prénom")
                .setDescription("Ajouter votre prénom")
                .setRequired(true)
            )
            .addNumberOption((option) =>
              option
                .setName("âge")
                .setDescription("Ajouter votre âge")
                .setRequired(true)
            )
            .addStringOption((option) =>
              option
                .setName("genre")
                .setDescription("Ajouter votre genre")
                .addChoices(
                  { name: "Homme", value: "Homme" },
                  { name: "Femme", value: "Femme" },
                  { name: "Autres", value: "Autres" }
                )
                .setRequired(true)
            )
            .addStringOption((option) =>
              option
                .setName("gamertag")
                .setDescription("Ajouter votre gamertag")
                .setRequired(true)
            )
        )
        .addSubcommand((subcommand) =>
          subcommand
            .setName("afficher")
            .setDescription("Affiche les informations de votre compte discord")
            .addUserOption((option) =>
              option
                .setName("utilisateur")
                .setDescription("L'utilisateur à afficher les informations")
                .setRequired(true)
            )
        )
    ),
  run: async (interaction) => {
    if (interaction.options.getSubcommand() === "créer") {
      const user = interaction.options.getUser("utilisateur");

      // if (await User.findOne({ id: user.id })) {
      //     const initErrorEmbed = new EmbedBuilder()
      //     .setColor(myVar.color_error)
      //     .setDescription(`${myVar.emoji_deny} Votre compte est déjà initialiser!`)

      //     return interaction.reply({ embeds: [initErrorEmbed], ephemeral: true })
      // }

      const userData =
        (await User.findOne({ id: user.id })) || new User({ id: user.id });
      userData.joinedAt = new Date();
      userData.id = user.id;
      userData.username = user.username;
      userData.prenom = interaction.options.getString("prénom");
      userData.age = interaction.options.getNumber("âge");
      userData.sexe = interaction.options.getString("genre");
      userData.gamertag = interaction.options.getString("gamertag");
      userData.save();

      const initEmbed = new EmbedBuilder()
        .setColor(myVar.color_server)
        .setTitle(`Panel de ${user.username}`)
        .setFields(
          { name: "Id", value: `${user.id}` },
          { name: "Nom d'utilisateur", value: `${user.tag}` },
          { name: "Arrivée", value: `${userData.joinedAt}` },
          { name: "Gamertag", value: `${userData.gamertag}` },
          { name: "Prenom", value: `${userData.prenom}` },
          { name: "Âge", value: `${userData.age}` },
          { name: "Genre", value: `${userData.sexe}` }
        );
      await interaction.reply({ embeds: [initEmbed] });
    }

    if (interaction.options.getSubcommand() === "afficher") {
      const user =
        interaction.options.getUser("utilisateur") || interaction.member.user;

      if (!(await User.findOne({ id: user.id }))) {
        const afficherErrorEmbed = new EmbedBuilder()
          .setColor(myVar.color_error)
          .setDescription(
            `${myVar.emoji_deny} Vous n'avez pas initialiser votre compte!`
          );

        return interaction.reply({
          embeds: [afficherErrorEmbed],
          ephemeral: true,
        });
      }

      const userData = await User.findOne({ id: user.id });

      const afficherEmbed = new EmbedBuilder()
        .setColor(myVar.color_server)
        .setTitle(`Panel de ${user.username}`)
        .setThumbnail(interaction.user.displayAvatarURL())
        .setFooter({
          text:
            "Membre depuis le " +
            userData.joinedAt.toLocaleDateString("fr-FR", {
              weekday: "long",
              month: "long",
            }),
          iconURL:
            "https://media.discordapp.net/attachments/832309437329965116/1030247192151203950/1665645830743.png",
        })
        .setFields(
          { name: "Id", value: `${user.id}` },
          { name: "Nom d'utilisateur", value: `${user.tag}` },
          { name: "Gamertag", value: `${userData.gamertag}` },
          { name: "Prenom", value: `${userData.prenom}` },
          { name: "Âge", value: `${userData.age}` },
          { name: "Genre", value: `${userData.sexe}` }
        );
      await interaction.reply({ embeds: [afficherEmbed] });
    }
  },
};
