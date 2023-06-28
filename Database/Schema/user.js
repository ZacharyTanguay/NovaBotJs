const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true},
    prenom: { type: String, default: "" },
    nom: { type: String, default: "" },
    age: { type: String, default: "" },
    sexe: { type: String, default: "" },
    date_de_naissance: { type: String, default: "" },
    lieu_de_naissance: { type: String, default: "" },
    carte_identite_vrai: { type: Boolean, default: false },
    carte_identite_fausse: { type: Boolean, default: false },
    compte_bancaire: { type: Boolean, default: false },
    argent: {
        propre: { type: Number, default: 0 },
        sale: { type: Number, default: 0 },
    },
    carte_identite_fausse: {
        nom: { type: String, default: "" },
        prenom: { type: String, default: "" },
        age: { type: String, default: "" },
        sexe: { type: String, default: "" },
        naissance: { type: String, default: "" },
        nationalite: { type: String, default: "" },
    },
    stats: {
        faim: { type: String, default: 100 },
        soif: { type: String, default: 100 },
        sante: { type: String, default: 100 },
    },
}, { collection: "Utilisateurs" })

module.exports = { User: mongoose.model("User", userSchema) }