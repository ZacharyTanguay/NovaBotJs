const mongoose = require("mongoose")

const msg = require("C:/NovaBotJs/BotJson/message.json")

const Entreprise = new mongoose.Schema({
    liquide: { type: Number, default: 0 },
    banque: { type: Number, default: 0 },
    cryptomonnaie: { type: Number, default: 0 },
    argent_sale: { type: Number, default: 0 },
    argent_blanchi: { type: Number, default: 0 }
})
