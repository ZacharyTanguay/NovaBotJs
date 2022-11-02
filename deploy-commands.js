const fs = require('node:fs');
const path = require('node:path');
const ascii = require("ascii-table");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const { client_id, guild_id, token } = require('/workspace/NovaBotJs/BotJson/config.json');

const commands = [];
const commandsPath = path.join(__dirname, 'Commands');
const commandFolders = fs.readdirSync('./Commands');

const table = new ascii().setHeading("Category" ,"Commands", "Status");

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationCommands(client_id, guild_id), { body: [] })
	.then(() => console.log('Tout les slash commandes introuvables on été supprimer!'))
	.catch(console.error);

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./Commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./Commands/${folder}/${file}`);
		commands.push(command.data.toJSON());
		table.addRow(folder, file, 'chargé');
		continue;
	}
}
console.log(`${table} \nSlash commandes chargés avec succès!`);

rest.put(Routes.applicationGuildCommands(client_id, guild_id), { body: commands })
	.then(() => console.log("Tout les slash commandes on été créer, chargé et sont prêt à l'usage!"))
	.catch(console.error);