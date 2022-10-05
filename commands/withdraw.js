const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, Colors } = require("discord.js")
const { User } = require("../utils/schemas")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("deposit")
    .setDescription("déposez une certaine somme d'argent dans votre compte bancaire")
    .addNumberOption(
        option => option
        .setName("amount")
        .setDescription("montant d'argent que vous souhaitez déposer **(montant minimum de 5$)**")
        .setRequired(true)
        .setMinValue(5)
    ),
    run: async (interaction) => {
        const user = interaction.member.user,
        amount = interaction.options.getNumber("amount")
        userData = await User.findOne({ id: user.id }) || new User({ id: user.id }),
        embed = new EmbedBuilder()

        if (amount < 5) return interaction.reply ({
            embeds: [embed
                .setDescription(`\` ${user} \` vous devez faire un retrait de minimum 5$**`)
                .setColor(Colors.Red)
                .setFooter({text: "\` 🏦 Pacific Bank 🏦 \`"})
            ],
        })

        if (userData.Banque < amount) return interaction.reply({
            embeds: [embed
                .setDescription(`\` ${user} \` vous ne possédez pas cette somme, il vous manquent **${amount - userData.Banques}$**`)
                .setColor(Colors.Red)
                .setFooter({text: "\` 🏦 Pacific Bank 🏦 \`"})
            ],
        })

        userData.Banque -= amount
        userData.Cash += amount
        userData.save()

        return interaction.reply({
            embeds: [ embed
                .setDescription(`✅ \` ${user} \` ${amount} ont été retirée de votre compte`)  
                .setColor(Colors.Green)
                .setFooter({text: "\` 🏦 Pacific Bank 🏦 \`"})
            ],
        })
    }
}s