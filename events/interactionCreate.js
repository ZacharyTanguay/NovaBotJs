module.exports = async (interaction, client=interaction.client) => {
    
    if (!interaction.isChatInputCommand()) return;
    
	const command = interaction.client.commands.get(interaction.commandName);
    
	if (!command) return;
    
	try {
        await command.run(interaction);
	} catch (error) {
        console.error(error);
		await interaction.reply({ content: `Il y a eu une erreur lors de l'execution de la commande, veuillez réessayer et si l'erreur persiste signaler la a un membre du staff.`, ephemeral: true });
	}

    //if(interaction.isCommand()) client.commands.get(interaction.commandName)?.run(interaction) (old)
}