const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, Colors } = require("discord.js")
const { User } = require("../utils/schemas")

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
  });

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
        targetData = await User.findOne({ id: target.id }) || new User({ id: target.id })
        embed = new EmbedBuilder()

        if (amount < 1) return interaction.reply({
            embeds: [embed
                .setDescription(`❌ \` ${user.username} \` le montant saisi n'est pas valide`)  
                .setColor(Colors.Red)
            ],
        })

        targetData.Cash -= amount
        targetData.save()

        return interaction.reply({
            embeds: [ embed
                .setDescription(`✅ \` ${user.username} \` à retirer **${formatter.format(amount)}** à \` ${target} \``)  
                .setColor(Colors.Green)
            ],
        })
    }
}