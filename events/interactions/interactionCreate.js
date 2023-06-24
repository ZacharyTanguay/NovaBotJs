const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction, client) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		if (interaction.isModalSubmit()) {
			const modalInteraction = client.modalForms.get(interaction.customId);
			if (!modalInteraction) return;
		}

		try {
			await command.execute(interaction, client);
		} catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}
	},
};

// const {CommandInteraction, ButtonStyle, ButtonBuilder, ActionRowBuilder} = require("discord.js");
// const { User } = require("../../Database/Schema/user.js")

// module.exports = {
//   name: "interactionCreate",
//   /**
//    *
//    * @param {CommandInteraction} interaction
//    */
//   async execute (interaction, client) {
//     if (!interaction.isChatInputCommand()) return;

//     const command = client.commands.get(interaction.commandName);

//     if (!command) {
//       interaction.reply({content: "Outdated command"});
//     }

//     command.run(interaction, client);
//   },
// };