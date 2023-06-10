const fs = require('node:fs');
const path = require('node:path');
const { Collection } = require('discord.js');

function loadEvents(client) {
client.events = new Collection();

const eventsPath = fs.readdirSync("./events");
  for (const folder of eventsPath) {
    const eventFiles = fs.readdirSync(`./events/${folder}`).filter((file) => file.endsWith(".js"));
    for (const file of eventFiles) {
	    const event = require(`../Events/${folder}/${file}`);
	    if (event.once) {
		  client.once(event.name, (...args) => event.execute(...args));
	    } else {
		    client.on(event.name, (...args) => event.execute(...args));
	    }
   }
  }
}
module.exports = {loadEvents};

  // const ascii = require("ascii-table");
  // const fs = require("fs");
  // const table = new ascii().setHeading("Category" ,"Commands", "Status");
  // const chalk = require("chalk");

  // const folders = fs.readdirSync("./Events");
  // for (const folder of folders) {
  //   const files = fs
  //     .readdirSync(`./Events/${folder}`)
  //     .filter((file) => file.endsWith(".js"));
  //   for (const file of files) {
  //     const event = require(`../Events/${folder}/${file}`);

  //     if (event.rest) {
  //       if (event.once)
  //         client.rest.once(event.name, (...args) =>
  //           event.execute(...args, client)
  //         );
  //       else
  //         client.rest.on(event.name, (...args) =>
  //           event.execute(...args, client)
  //         );
  //     } else {
  //       if (event.once)
  //         client.once(event.name, (...args) => event.execute(...args, client));
  //       else client.on(event.name, (...args) => event.execute(...args, client));
  //     }
  //     table.addRow(folder, file, "loaded");
  //     continue;
  //   }
  // }
  // return console.log(table.toString(), "\n",chalk.green("loaded events"));