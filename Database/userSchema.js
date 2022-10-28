const mongoose = require("mongoose")
const msg = require("C:/NovaBotJs/BotJson/message.json")

const User = new mongoose.Schema({
    createdAt: { type: String, default: new Date() },
    user_id: { type: String, unique: true, required: true },
    user_tag: { type: String, default: "Anonyme" },
    user_nom: { type: String, default: "Anonyme" },
    user_prenom: { type: String, default: "Anonyme" },
    user_age: { type: String, default: "Anonyme" },
    user_sexe: { type: String, default: "Anonyme" },
    user_gamertag: { type: String, default: "Anonyme" },
    
    user_warn: [
        {
           date: { type: String, default: new Date() },
           tag : { type: String, default: "" },
           warning: { type: String, default: "" },
           raison: { type: String, default:  "" },
           gravité: { type: Number, default: 0 },
           moderateur: { type: String, default: "@Staff" },
        }
    ],
})
