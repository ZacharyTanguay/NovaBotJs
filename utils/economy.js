const mongoose = require("mongoose")

const User = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    Cash: { type: Number, default: 0 },
    Banque: { type: Number, default: 0 },
    Crypto: { type: Number, default: 0 },
})
module.exports = { User: mongoose.model("User", User) }