//#region Imports
const mongoose = require("mongoose")
//#endregion

const userSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    tag: { type: String, required: true },
    uname: { type: String, required: true },
    joinAt: { type: Date, default: Date.now()},
}, { collection: "Utilisateurs" })

module.exports = { User: mongoose.model("User", userSchema) }