const { Client, Intents, Collection, GatewayIntentBits } = require('discord.js');
const { bot_token, mongo_url } = require('./config.json');
const { readdirSync } = require('fs');

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

/* Commands and Events handler */
client.commands = new Collection(readdirSync('./commands').map(cmd => [cmd.split('.')[0], require(`./commands/${cmd}`)]));
for (const event of readdirSync("./events")) client.on(event.split(".")[0], require(`./events/${event}`).bind(null))

/* Discord Bot and MongoDB connection */
client.login(bot_token).then(() => mongoose.connect(mongo_url));