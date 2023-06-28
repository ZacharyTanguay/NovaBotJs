const { User } = require('../Database/Schema/user.js');

module.exports = {
    fetchUser,
}

async function fetchUser (user) {
    let userDb = await User.findOne({ id: user.id})
    if (userDb) {
        return userDb
    } else {
        userDb = new User({ id: user.id })
    }
    await userDb.save().catch(console.log(`Nouvel utilisateur -> ${user.username} | ${user.tag} enregistré dans la base de données`))
    return userDb;
}