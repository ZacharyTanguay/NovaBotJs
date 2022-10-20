const mongoose = require("mongoose")

const User = new mongoose.Schema({
    id: { type: String, unique: true, required: true},
    Cash: { type: Number, default: 0 },
    Banque: { type: Number, default: 0 },
    ArgentSale: { type: Number, default: 0 },
    Crypto: { type: Number, default: 0 },

    prénom: { type: String, default: "" },
    nom: { type: String, default: "" },
    age: { type: String, default: "" },
    sexe: { type: String, default: "" },
    dateDeNaissance: { type: String, default: "" },
    lieuDeNaissance: { type: String, default: "" },
    carteIdentité: { type: Boolean, default: false },

    faim: { type: String, default: 0 },
    soif: { type: String, default: 0 },
    santé: { type: String, default: 0 },
})
module.exports = { User: mongoose.model("User", User) }