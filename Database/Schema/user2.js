const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true},
    tag: { type: String,},
    username: { type: String},
    cpteBancaire: { type: Boolean, default: false },
    argent: {
        propre: { type: Number, default: 0 },
        sale: { type: Number, default: 0 },
    },
    vraiCni: {
        existe: { type: Boolean, default: false },
        prénom: { type: String },
        nom: { type: String },
        âge: { type: String },
        sexe: { type: String },
        dateNaissance: { type: String },
        lieuNaissance: { type: String },
        nationalité: { type: String },
    },
    fauxCni: {
        existe: { type: Boolean, default: false },
        prénom: { type: String },
        nom: { type: String },
        âge: { type: String },
        sexe: { type: String },
        dateNaissance: { type: String },
        lieuNaissance: { type: String },
        nationalité: { type: String },
    },
    stats: {
        faim: { type: String, default: 100 },
        soif: { type: String, default: 100 },
        sante: { type: String, default: 100 },
    },
}, { collection: "Utilisateurs" })

module.exports = { User: mongoose.model("User", UserSchema) }