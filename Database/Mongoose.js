const { User } = require('../Database/Schema/user.js');

module.exports = {
    fetch_user,
    create_compteBancaire,
}

async function fetch_user (user) {
    let userDb = await User.findOne({ id: user.id})
    if (userDb) {
        return userDb
    } else {
        userDb = new User({ id: user.id })
    }
    await userDb.save().catch(console.log(`Nouvel utilisateur -> ${user.username} | ${user.tag} enregistré dans la base de données`))
    return userDb;
}

async function create_compteBancaire (compteBancaireData) {
    try {
        compteBancaireData.iban = Math.floor(Math.random() * (99999999 - 10000000)) + 10000000
        compteBancaireData.codeSecret = Math.floor(Math.random() * (999999 - 100000)) + 100000
        compteBancaireData.codeCarte = Math.floor(Math.random() * (9999 - 1000)) + 1000
        compteBancaireData.argent_propre = 10000
        compteBancaireData.save();
    } catch (error) {
        console.log("Une erreur c'est produite lors de l'exécution de la fonction créer_compte_bancaire" + error)
    }
}