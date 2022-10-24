const mongoose = require("mongoose")
const msg = require("C:/NovaBotJs/BotJson/message.json")
const { moneyFormat } = require("C:/NovaBotJs/Handlers/functions.js")

const Statistiques = new mongoose.Schema({
    stats_nbUser: { type: Number, default : 0 },
    stats_nbCitoyen: { type: Number, default: 0 },
    stats_nbEntreprise: { type: Number, default: 0 },
    stats_argentLiquide: { type: String, default: "0" },
    stats_argentBanque: { type: String, default: "0" },
    stats_argentSale: { type: String, default: "0" },
    stats_cryptomonnaie: { type: String, default: "0" },
})
