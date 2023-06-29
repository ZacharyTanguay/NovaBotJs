//#region Imports
const mongoose = require("mongoose")
//#endregion

const compteBancaireSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    new: { type: Boolean, default: true },
    secu: { type: String, default: "Code secret" },
    iban: { type: String },
    codeCb: { type: String },
    codeSec: { type: String },
    argentSale: { type: Number, default: 0 },
    argentPropre: { type: Number, default: 0 },
    prêt: {
        enCours: { type: Boolean, default: false },
        montant: { type: Number, default: 0 },
        taux: { type: Number, default: 0 },
        mensualité: { type: Number, default: 0 },
        durée: { type: Number, default: 0 },
        date: { type: Date, default: Date.now() },
        dateFin: { type: Date, default: Date.now() },
    }
}, { collection: "Comptes bancaires" })

module.exports = { CompteBancaire: mongoose.model("CompteBancaire", compteBancaireSchema) }