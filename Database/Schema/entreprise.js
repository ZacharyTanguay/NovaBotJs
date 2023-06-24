const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid');

const Entreprise = new mongoose.Schema({
    nom: { type: String, default: ""},
    patron: {type: String, default: "Inconnu"},
    possesseur: {type: String, default: "Gouvernement"},
    type: { type: String, default: ""},
    logo: { type: String, default: ""},
    couleur: { type: String, default: ""},
    createdAt: { type: String, default: Date.now() },

    argent: { type: Number, default: 0},
    profit: { type: Number, default: 0},
    depense: { type: Number, default: 0},
    nbEmploye: { type: Number, default: 0},
    nbMaxEmploye: { type: Number, default: 2},

})
module.exports = { Entreprise: mongoose.model("Entreprise", Entreprise) }