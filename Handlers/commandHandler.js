function loadCommands(client) {
	const ascii = require("ascii-table");
	const fs = require("fs");
	const chalk = require("chalk");
	const table = new ascii().setHeading("Category" ,"Commands", "Status");


  
	const commandsFolder = fs.readdirSync("./Commands");
	for (const folder of commandsFolder) {
	  const commandFiles = fs
		.readdirSync(`./Commands/${folder}`)
		.filter((file) => file.endsWith("js"));
  
	  for (const file of commandFiles) {
		const commandFile = require(`../Commands/${folder}/${file}`);
  
		client.commands.set(commandFile.data.name, commandFile);
  
		if (commandFile.developer) developerArray.push(commandFile.data.toJSON());
  
		table.addRow(folder, file, "loaded");
		continue;
	  }
	}
  
	return console.log(table.toString(), "\n",chalk.green("loaded commands"));
  }
  
  module.exports = {loadCommands};