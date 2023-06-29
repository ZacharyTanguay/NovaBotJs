//#region Imports
const { Events } = require('discord.js');
//#endregion

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log("------------------------------------");
        console.log("Bot Discord démarré avec succès !");
        console.log("------------------------------------");
        console.log("| Informations du bot |");
        console.log(`Nom : ${client.user.tag}`);
        console.log(`ID : ${client.user.id}`);
        console.log("Version : 1.0.0");
        console.log("Développeur : Zack");
        console.log("------------------------------------");
    },
};