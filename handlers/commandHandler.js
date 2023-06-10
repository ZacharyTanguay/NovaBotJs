const fs = require('node:fs');
const path = require('node:path');
const { Collection } = require('discord.js');

function loadCommands(client) {
	client.commands = new Collection();
	const foldersPath = path.join(__dirname, '../commands');
	const commandFolders = fs.readdirSync(foldersPath);
	for (const folder of commandFolders) {
		const commandsPath = path.join(foldersPath, folder);
		const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const command = require(filePath);
			// Set a new item in the Collection with the key as the command name and the value as the exported module
			if ('data' in command && 'execute' in command) {
				client.commands.set(command.data.name, command);
			} else {
				console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
			}
		}
	}
  }
  module.exports = {loadCommands};

  	// const ascii = require("ascii-table");
	// const fs = require("fs");
	// const chalk = require("chalk");
	// const table = new ascii().setHeading("Category" ,"Commands", "Status");


  
	// const commandsFolder = fs.readdirSync("./Commands");
	// for (const folder of commandsFolder) {
	//   const commandFiles = fs
	// 	.readdirSync(`./Commands/${folder}`)
	// 	.filter((file) => file.endsWith("js"));
  
	//   for (const file of commandFiles) {
	// 	const commandFile = require(`../Commands/${folder}/${file}`);
  
	// 	client.commands.set(commandFile.data.name, commandFile);
  
	// 	if (commandFile.developer) developerArray.push(commandFile.data.toJSON());
  
	// 	table.addRow(folder, file, "loaded");
	// 	continue;
	//   }
	// }
  
	// return console.log(table.toString(), "\n",chalk.green("loaded commands"));