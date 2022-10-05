const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, Colors } = require("discord.js")
const { User } = require("../utils/schemas")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("remove-money")
    .setDescription("retire un certain montant d'argent à un utilisateur **(administateur seulement)**")
    .addUserOption(
        option => option
        .setName("user")
        .setDescription("utilisateur à qui vous voulez retirer de l'argent")
        .setRequired(true)
    )
    .addNumberOption(
        option => option
        .setName("amount")
        .setDescription("montant d'argent retirer du compte bancaire de l'utilisateur **(montant minimum de 1$)**")
        .setRequired(true)
        .setMinValue(1)
    ),
    run: async (interaction) => {
        const user = interaction.member.user
        const target = interaction.options.getUser("user")
        amount = interaction.options.getNumber("amount")
        userData = await User.findOne({ id: user.id }) || new User({ id: user.id }),
        embed = new EmbedBuilder()

        if (amount < 1) return interaction.reply({
            embeds: [embed
                .setDescription(`\` ${user} \` le montant saisi n'est pas valide`)  
                .setColor(Colors.Red)
            ],
        })

        userData.Cash -= amount
        userData.save()

        return interaction.reply({
            embeds: [ embed
                .setDescription(`\` ${user} \` à retirer **${amount}$** à \` ${target} \``)  
                .setColor(Colors.Green)
            ],
        })
    }
}