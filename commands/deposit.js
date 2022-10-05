const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, Colors } = require("discord.js")
const { User } = require("../utils/schemas")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("deposit")
    .setDescription("Deposit your wallet money to bank")
    .addNumberOption(
        option => option
        .setName("amount")
        .setDescription("Amount to deposit")
        .setRequired(true)
        .setMinValue(100) //should be more than 100 coins
    ),
    run: async (interaction) => {
        const user = interaction.member.user,
        amount = interaction.options.getNumber("amount")
        userData = await User.findOne({ id: user.id }) || new User({ id: user.id }),
        embed = new EmbedBuilder()

        if (userData.Cash < amount) return interaction.reply({
            embeds: [embed
                .setDescription(`Vous ne possédez pas cette somme, il vous manquent \` ${amount - userData.Cash}$ \``)
                .setColor(Colors.Orange)
            ],
        })

        userData.Cash -= amount
        userData.Banque += amount
        userData.save()

        return interaction.reply({
            embeds: [ embed
                .setDescription(`✅ Vous avez déposez \` ${amount}$ \` dans votre compte en banque`)  
                .setColor(Colors.Orange)
            ],
        })
    }
}