//#region Imports
const { User } = require('../database/models/utilisateur');
const { CompteBancaire } = require('../database/models/compteBancaire');
//#endregion

module.exports = {
    fetchUser,
    updateUser,
    deleteUser,
    fetchCompteBancaire,
};

// --------------------------------------------------------------------
// Fonctions User (utilisateur.js)
// --------------------------------------------------------------------
//#region
async function fetchUser(user) {
    try {
        let userDb = await User.findOne({ id: user.id })
        if (userDb) {
            return userDb
        } else {
            userDb = new User({ id: user.id })
        }
        await userDb.save().catch(console.log(`Nouvel utilisateur -> ${user.username} | ${user.tag} enregistré dans la base de données`))
        return userDb;
    } catch (err) {
        console.trace("Impossible de récupérer l'utilisateur lors de l'exécution de la fonction --> fetchUser.")
        console.error(err)
    }
}

async function updateUser(user) {
    try {
        let userDb = await User.findOne({ id: user.id })
        if (userDb) {
            userDb.tag = user.tag
            userDb.uname = user.username
            await userDb.save().catch(console.log(`Utilisateur -> ${user.username} | ${user.tag} mis à jour dans la base de données`))
        } else {
            userDb = new User({ id: user.id, tag: user.tag, uname: user.username })
            await userDb.save().catch(console.log(`Nouvel utilisateur -> ${user.username} | ${user.tag} enregistré dans la base de données`))
        }
        return userDb;
    } catch (err) {
        console.trace("Impossible de mettre à jour l'utilisateur lors de l'exécution de la fonction --> updateUser.")
        console.error(err)
    }
}

async function deleteUser(user) {
    try {
        let userDb = await User.findOne({ id: user.id })
        if (userDb) {
            await userDb.deleteOne().catch(console.log(`Utilisateur -> ${user.username} | ${user.tag} supprimé de la base de données`))
        }
    } catch (err) {
        console.trace("Impossible de supprimer l'utilisateur lors de l'exécution de la fonction --> deleteUser.")
        console.error(err)
    }
}
//#endregion

// --------------------------------------------------------------------
// Fonctions compteBancaire (compteBancaire.js)
// --------------------------------------------------------------------
//#region
async function fetchCompteBancaire(user) {
    try {
        let compteBancaireDb = await CompteBancaire.findOne({ id: user.id })
        if (compteBancaireDb) {
            return compteBancaireDb
        } else {
            return null
        }
    } catch (err) {
        console.trace("Impossible de récupérer le compte bancaire lors de l'exécution de la fonction --> fetchCompteBancaire.")
        console.error(err)
    }
}
//#endregion