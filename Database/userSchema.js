const mongoose = require("mongoose")
const msg = require("C:/NovaBotJs/BotJson/message.json")

const User = new mongoose.Schema({
    user_id: { type: String, unique: true, required: true },
    user_nom: { type: String, default: "Anonyme" },
    user_prenom: { type: String, default: "Anonyme" },
    user_age: { type: String, default: "Anonyme" },
    user_sexe: { type: String, default: "Anonyme" },
    user_discord: { type: String, default: "Anonyme" },
    user_gamertag: { type: String, default: "Anonyme" },

    carte_identite_vrai: { type: Boolean, default: false },
    carte_identite_fausse: { type: Boolean, default: false },
    compte_bancaire: { type: Boolean, default: false },
    entreprise: { type: Boolean, default: false },
})