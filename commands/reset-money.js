const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, Colors } = require("discord.js")
const { User } = require("../utils/schemas")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("reset-money")
    .setDescription("reset le compte bancaire d'un utilisateur au montant par défaut **(administateur seulement)**")
    .addUserOption(
        option => option
        .setName("user")
        .setDescription("utilisateur à qui vous voulez reset le compte bancaire")
        .setRequired(true)
    ),
    run: async (interaction) => {
        const user = interaction.member.user
        const target = interaction.options.getUser("user")
        userData = await User.findOne({ id: user.id }) || new User({ id: user.id }),
        embed = new EmbedBuilder()

        userData.Cash = 0
        userData.Banque = 10000
        userData.save()

        return interaction.reply({
            embeds: [ embed
                .setDescription(`\` ${user} \` à reset le compte bancaire de \` ${target} \` au montant par défaut`)  
                .setColor(Colors.Green)
            ],
        })
    }
}