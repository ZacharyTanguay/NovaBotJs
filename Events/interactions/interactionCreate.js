const {CommandInteraction, ButtonStyle, ButtonBuilder, ActionRowBuilder} = require("discord.js");
const { User } = require("../../models/userSchema.js")

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute (interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      interaction.reply({content: "La commande suivante n'est plus valide." , ephemeral: true});
    }

    command.run(interaction, client);
  },
};