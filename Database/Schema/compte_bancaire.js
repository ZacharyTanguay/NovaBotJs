const mongoose = require("mongoose")

const CompteBancaire = new mongoose.Schema({
    id: { type: String, unique: true, required: true},
    userTag: { type: String, required: true},
    securite: { type: String, default: "Code secret" },
    premiereConnexion: { type: Boolean, default: true },
    iban: { type: String, default: ""},
    codeCarte: { type: String, default: ""},
    codeSecret: { type: String, default: ""},
    argent_propre: { type: Number, default: 0 },
    argent_sale: { type: Number, default: 0 },
}, { collection: "Comptes bancaires" })

module.exports = { CompteBancaire: mongoose.model("CompteBancaire", CompteBancaire) }