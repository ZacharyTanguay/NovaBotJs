const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, Colors } = require("discord.js")
const { User } = require("C:/NovaBotJs/utils/economy.js")

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

module.exports = {
    data: new SlashCommandBuilder()
    .setName("retrait")
    .setDescription("retirez une certaine somme d'argent dans votre compte bancaire")
    .addNumberOption(
        option => option
        .setName("montant")
        .setDescription("montant d'argent que vous souhaitez retirer **(montant minimum de 5$)**")
        .setRequired(true)
        .setMinValue(5)
    ),
    run: async (interaction) => {
        const user = interaction.member.user,
        amount = interaction.options.getNumber("montant")
        userData = await User.findOne({ id: user.id }) || new User({ id: user.id }),
        embed = new EmbedBuilder()

        if (amount < 5) return interaction.reply ({
            embeds: [embed
                .setDescription(`❌ \` ${user.username} \` vous devez faire un retrait de minimum 5$**`)
                .setColor(Colors.Red)
                .setFooter({text: "🏦 Pacific Bank 🏦"})
            ],
        })

        const amountInBank = amount - userData.Banque

        if (userData.Banque < amount) return interaction.reply({
            embeds: [embed
                .setDescription(`❌ \` ${user.username} \` vous ne possédez pas cette somme, il vous manquent **${formatter.format(amountInBank)}$**`)
                .setColor(Colors.Red)
                .setFooter({text: "🏦 Pacific Bank 🏦"})
            ],
        })

        userData.Banque -= amount
        userData.Cash += amount
        userData.save()

        return interaction.reply({
            embeds: [ embed
                .setDescription(`✅ \` ${user.username} \` **${formatter.format(amount)}** ont été retirée de votre compte`)  
                .setColor(Colors.Green)
                .setFooter({text: "🏦 Pacific Bank 🏦"})
            ],
        })
    }
}