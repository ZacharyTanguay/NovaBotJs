const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};

// const {Client, ActivityType} = require("discord.js");

// module.exports = {
//   name: "ready",
//   once: true,
//   /**
//    *
//    * @param {Client} client
//    */
//   execute(client) {
//     console.log(`${client.user.username} booted up.`);
//   },
// };