const mongoose = require("mongoose")
const myVar = require("../BotJson/myVar.json")

const Entreprise = new mongoose.Schema({
    
    createdAt: { type: Date, default: new Date() },
        
    nom: { type: String, default: "Empty", required: true},
    
    categorie: { type: String, default: "Empty"},
    
    patron_nom: { type: String, default: "Aucun" },
    
    patron_id: { type: String, default: "Aucun" },
    
    couleur: { type: String, default: myVar.color_server },
    
    logo: { type: String, default: "Aucun" },
    
    banque: { type: Number, default: 0 },
    
    cryptomonnaie: { type: Number, default: 0 },
    
    argent_sale: { type: Number, default: 0 },
    
    argent_blanchi: { type: Number, default: 0 },
    
    profit_moyenne: { type: Number, default: 0 },
    
    profit_total: { type: Number, default: 0 },
    
    depense_moyenne: { type: Number, default: 0 },
    
    depense_total: { type: Number, default: 0 },
    
    action_restant: { type: Number, default: 0 },
    
    action_valeur: { type: Number, default: 0 },
    
    pret: { type: Number, default: 0 },
    
    employer_nb: { type: Number,  default: 0 },
    
    employer_nbMax: { type: Number, default: 0 },
    
    actionnaires: [
        {
            actionnaire_nom: { type: String, default: "" },
            actionnaire_id: { type: String, default: "" },
            actionnaire_part: { type: Number, default: 0 },
        }
    ],
                                       
    postes: [
        {
            poste_nom: { type: String, default: "" },
            poste_salaire: { type: Number, default: 0 },
        }
    ],                               
    
    employers: [
        {
            employer_nom: { type: String, default: "" },
            employer_id: { type: String, default: "" },
            employer_poste: { type: String, default: "" },
            employer_salaire: { type: Number, default: 0 },
        }
    ],
    
    financeurs: [
        {
            financeur_nom: { type: String, default: "Anonyme" },
            financeur_id: { type: String, default: "" },
            montant: { type: Number, default: 0 },
        }
    ],
        
})
