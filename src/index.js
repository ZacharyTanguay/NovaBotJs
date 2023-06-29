//#region Imports
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { loadCommands } = require('./handlers/commandHandler');
const { loadEvents } = require('./handlers/eventHandler');
const mongoose = require('mongoose');
require('dotenv').config(); //Charge les variables d'environnement
//#endregion

//Initialisation du client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
client.events = new Collection();

//Connexion au client et à la base de données
client.login(process.env.CLIENT_TOKEN)
    .then(() => {
        loadCommands(client);
        loadEvents(client);
        mongoose.connect(process.env.MONGODB_URI); //Connexion à la base de données
    }).catch((err) => {
        console.trace('Impossible de se connecter au client.');
        console.error(err);
    });