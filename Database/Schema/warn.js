const mongoose = require("mongoose")

const Warn = new mongoose.Schema({
    date: { type: String, default: new Date() },
    tag : { type: String, default: "" },
    warning: { type: String, default: "" },
    raison: { type: String, default:  "" },
    gravite: { type: Number, default: 0 },
    moderateur: { type: String, default: "Staff" },
}, { collection: "Warn" })
module.exports = { Warn: mongoose.model("Warn", Warn)}