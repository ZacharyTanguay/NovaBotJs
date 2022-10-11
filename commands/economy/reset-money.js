const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, Colors } = require("discord.js")
const { User } = require("C:/NovaBotJs/utils/economy.js")

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
        targetData = await User.findOne({ id: target.id }) || new User({ id: target.id })
        embed = new EmbedBuilder()

        targetData.Cash = 0
        targetData.Banque = 10000
        targetData.save()

        return interaction.reply({
            embeds: [ embed
                .setDescription(`✅ \` ${user.username} \` à reset le compte bancaire de \` ${target.username} \` au montant par défaut`)  
                .setColor(Colors.Green)
            ],
        })
    }
}