const mongoose = require("mongoose")
const myVar = require("../BotJson/myVar.json")

const User = new mongoose.Schema({
    joinedAt: { type: Date, default: "" },
    id: { type: String, unique: true, required: true },
    username: { type: String, default: "" },
    prenom: { type: String, default: "Inconnu" },
    age: { type: String, default: "Inconnu" },
    sexe: { type: String, default: "Inconnu" },
    gamertag: { type: String, default: "Inconnu" },
    
    warn: [
        {
           date: { type: String, default: new Date() },
           tag : { type: String, default: "" },
           warning: { type: String, default: "" },
           raison: { type: String, default:  "" },
           gravité: { type: Number, default: 0 },
           moderateur: { type: String, default: "Staff" },
        }
    ],
})
module.exports = { User: mongoose.model("User", User) }
