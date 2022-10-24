const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token, mongodb_url } = require('C:/NovaBotJs/BotJson/config.json');
const { loadEvents } = require("./Handlers/eventHandler");
const { loadCommands } = require("./Handlers/commandHandler");
const mongoose = require('mongoose');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

client.commands = new Collection();
client.events = new Collection();

client.login(token)
.then(() => {
	loadCommands(client);
	loadEvents(client);
	mongoose.connect(mongodb_url)
})
.catch((err) => console.log(err));