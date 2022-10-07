const fs = require('node:fs');
const path = require('node:path');
const { REST, Routes } = require('discord.js');
const { client_id, bot_token } = require('./config.json');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const rest = new REST({ version: '10' }).setToken(bot_token);

rest.put(Routes.applicationCommands(client_id), { body: [] })
	.then(() => console.log('Tout les slash commandes on été supprimer !'))
	.catch(console.error);

for (const file of commandFiles) {

	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
    console.log('Tout les slash commandes on été créer')
}