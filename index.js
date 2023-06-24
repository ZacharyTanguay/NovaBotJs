const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { bot_token, mongo_url } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
const {loadEvents} = require("./handlers/eventHandler");
const {loadCommands} = require("./handlers/commandHandler");

//const { loadButtons } = require('./events/interactions/interactionCreate');
const mongoose = require('mongoose');
const Sequelize = require('sequelize');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
client.events = new Collection();

client.login(bot_token)
.then(() => {
	loadCommands(client);
	loadEvents(client);
	mongoose.connect(mongo_url)
})
.catch((err) => console.log(err));