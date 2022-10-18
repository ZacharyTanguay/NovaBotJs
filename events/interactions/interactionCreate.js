const {CommandInteraction, ButtonStyle, ButtonBuilder, ActionRowBuilder} = require("discord.js");
const { User } = require("C:/NovaBotJs/utils/schema.js")

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
      interaction.reply({content: "Outdated command"});
    }

    command.run(interaction, client);
  },
};