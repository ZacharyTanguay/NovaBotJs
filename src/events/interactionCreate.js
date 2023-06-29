//#region Imports
const { Events } = require('discord.js');
//#endregion

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.trace(`Aucune commande correspondante à ${interaction.commandName} n'a été trouvée.`);
            return;
        }

        if (interaction.isModalSubmit()) {
            const modalInteraction = client.modalForms.get(interaction.customId);
            if (!modalInteraction) return;
        }

        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.trace(`Erreur lors de l'exécution de ${interaction.commandName}`);
            console.error(error);
        }
    },
};
