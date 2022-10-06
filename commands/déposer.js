const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, Colors } = require("discord.js")
const { User } = require("../utils/schemas")

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

module.exports = {
    data: new SlashCommandBuilder()
    .setName("déposer")
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
                .setDescription(`❌ \` ${user.username} \` vous devez faire un dépot de minimum **${formatter.format(5)}**`)
                .setColor(Colors.Red)
                .setFooter({text: "🏦 Pacific Bank 🏦"})
            ],
        })
        const amountInCash = amount - userData.Banque

        if (userData.Cash < amount) return interaction.reply({
            embeds: [embed
                .setDescription(`❌ \` ${user.username} \` vous ne possédez pas cette somme, il vous manquent **${formatter.format(amountInCash)}$**`)
                .setColor(Colors.Red)
                .setFooter({text: "🏦 Pacific Bank 🏦"})
            ],
        })

        userData.Cash -= amount
        userData.Banque += amount
        userData.save()

        return interaction.reply({
            embeds: [ embed
                .setDescription(`✅ \` ${user.username} \` **${formatter.format(amount)}** ont été déposée dans votre compte`)  
                .setColor(Colors.Green)
                .setFooter({text: "🏦 Pacific Bank 🏦"})
            ],
        })
    }
}