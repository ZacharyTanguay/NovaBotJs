const mongoose = require("mongoose")
const myVar = require("/workspace/NovaBotJs/BotJson/myVar.json")

const Citoyen = new mongoose.Schema({
    user_id: { type: String, unique: true, required: true },
    
    carte_identite_vrai: { type: Boolean, default: false },
    carte_identite_fausse: { type: String, default: false },
    compte_bancaire: { type: Boolean, default: false },

    liquide: { type: Number, default: 0 },
    banque: { type: Number, default: 0 },
    cryptomonnaie: { type: Number, default: 0 },
    argent_sale: { type: Number, default: 0 },
    argent_blanchi: { type: Number, default: 0 },

    vrai_id: [
        {
            nom: { type: String, default: "" },
            prenom: { type: String, default: "" },
            age: { type: String, default: "" },
            sexe: { type: String, default: "" },
            naissance: { type: String, default: "" },
            nationalite: { type: String, default: "" },
        }
    ],
    
    faux_id: [
        {
            nom: { type: String, default: "" },
            prenom: { type: String, default: "" },
            age: { type: String, default: "" },
            sexe: { type: String, default: "" },
            naissance: { type: String, default: "" },
            nationalite: { type: String, default: "" },
        }
    ],
    
    permis_conduire_voiture: { type: String, default: myVar.permis_deny_emoji },
    permis_conduire_moto: { type: String, default: myVar.permis_deny_emoji },
    permis_conduire_camion: { type: String, default: myVar.permis_deny_emoji },
    permis_conduire_avion: { type: String, default: myVar.permis_deny_emoji },
    permis_conduire_bateau: { type: String, default: myVar.permis_deny_emoji },
})
