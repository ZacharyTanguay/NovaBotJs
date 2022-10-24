const mongoose = require("mongoose")
const msg = require("C:/NovaBotJs/BotJson/message.json")

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
        new Schema({
            vrai_nom: { type: String, default: "Non rempli" },
            vrai_prenom: { type: String, default: "Non rempli" },
            vrai_age: { type: String, default: "Non rempli" },
            vrai_sexe: { type: String, default: "Non rempli" },
            vrai_naissance: { type: String, default: "Non rempli" },
            vrai_nationalite: { type: String, default: "Non rempli" },
        }, {_id: false})
    ],

    faux_nom: { type: String, default: "Non rempli" },
    faux_prenom: { type: String, default: "Non rempli" },
    faux_age: { type: String, default: "Non rempli" },
    faux_sexe: { type: String, default: "Non rempli" },
    faux_naissance: { type: String, default: "Non rempli" },
    faux_nationalite: { type: String, default: "Non rempli" },
    
    permis_conduire_voiture: { type: String, default: msg.permis_deny_emoji },
    permis_conduire_moto: { type: String, default: msg.permis_deny_emoji },
    permis_conduire_camion: { type: String, default: msg.permis_deny_emoji },
    permis_conduire_avion: { type: String, default: msg.permis_deny_emoji },
    permis_conduire_bateau: { type: String, default: msg.permis_deny_emoji },
})
