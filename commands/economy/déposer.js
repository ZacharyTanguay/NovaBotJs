const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, Colors } = require("discord.js")
const { User } = require("C:/NovaBotJs/utils/schema.js")

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

module.exports = {
    data: new SlashCommandBuilder()
    .setName("déposer")
    .setDescription("déposez une certaine somme d'argent dans votre compte bancaire")
    .addSubcommand(subcommand =>
        subcommand
        .setName("espèces")
        .setDescription("montant d'argent que vous souhaitez déposer **(montant minimum de 5$)**")
        .addNumberOption(
            option => option
            .setName("montant")
            .setDescription("utilisateur dont les informations doivent être créer")
            .addChoices(
                { name: formatter.format(100000), value: 100000 },
                { name: formatter.format(50000), value: 50000 },
                { name: formatter.format(10000), value: 10000 },
                { name: formatter.format(5000), value: 5000 },
                { name: formatter.format(1000), value: 1000 },
                { name: formatter.format(250), value: 250 },
                )
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName("tout")
        .setDescription("déposer tout votre argent cash*")
    ),
    run: async (interaction) => {
        const user = interaction.member.user,
        amount = interaction.options.getNumber("montant")
        userData = await User.findOne({ id: user.id }) || new User({ id: user.id }),
        embed = new EmbedBuilder()
        
        if (interaction.options.getSubcommand() === "montant") {
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
            }, amount = userData.Cash ,userData.Banque += amount, userData.Cash -= amount)
    
    
            userData.Cash -= amount
            userData.Banque += amount
            userData.save()
    
            return interaction.reply({
                embeds: [ embed
                    .setDescription(`✅ \` ${userData.prénom + " " + userData.nom} \` **${formatter.format(amount)}** ont été déposée dans votre compte`)  
                    .setColor(Colors.Green)
                    .setFooter({text: "🏦 Pacific Bank 🏦"})
                ],
            })
        }

        if (interaction.options.getSubcommand() === "tout") {
            const tout = userData.Cash

            userData.Cash -= tout
            userData.Banque += tout
            userData.save()
            return interaction.reply({
                embeds: [ embed
                    .setDescription(`✅ \` ${userData.prénom + " " + userData.nom} \` **${formatter.format(tout)}** ont été déposée dans votre compte`)  
                    .setColor(Colors.Green)
                    .setFooter({text: "🏦 Pacific Bank 🏦"})
                ],
            })
        }
    }
}