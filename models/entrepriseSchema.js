const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid');

const Entreprise = new mongoose.Schema({
    id: { type: String, unique: true, required: true},
    nom: { type: String, default: ""},
    patron: {type: String, default: "Inconnu"},
    type: { type: String, default: ""},
    logo: { type: String, default: ""},
    couleur: { type: String, default: ""},
    createdAt: { type: Date, default: Date.now },

    argent: { type: Number, default: 0},
    profit: { type: Number, default: 0},
    depense: { type: Number, default: 0},
    nbEmploye: { type: Number, default: 0},
    nbMaxEmploye: { type: Number, default: 2},

})
module.exports = { Entreprise: mongoose.model("Entreprise", Entreprise) }