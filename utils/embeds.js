const { EmbedBuilder } = require("discord.js")
const custom = require("../../../BotJson/myVar.json")

const embed_compteBancaireExiste = function get(user) {
    try {
        return new EmbedBuilder()
            .setColor(custom.color_deny)
            .setDescription(`${custom.emoji_deny} Vous avez déjà un compte bancaire **${user.tag}**`)
    } catch (error) {
        console.error(error)
    }
}