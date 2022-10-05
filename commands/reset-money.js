const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, Colors } = require("discord.js")
const { User } = require("../utils/schemas")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("reset-money")
    .setDescription("Reset le compte en banque d'un utilisateur (administateur seulement)")
    .addUserOption(
        option => option
        .setName("user")
        .setDescription("La personne a qui vous voulez reset l'argent")
        .setRequired(true)
    ),
    run: async (interaction) => {
        const user = interaction.member.user
        const target = interaction.options.getUser("user")
        userData = await User.findOne({ id: user.id }) || new User({ id: user.id }),
        embed = new EmbedBuilder()

        userData.Cash = 0
        userData.Banque = 0
        userData.save()

        return interaction.reply({
            embeds: [ embed
                .setDescription(`${user} à remis la balance de ${target} a 0`)  
                .setColor(Colors.Orange)
            ],
        })
    }
}