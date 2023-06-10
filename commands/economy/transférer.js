const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, Colors } = require("discord.js")
const { User } = require("../../models/userSchema.js")

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

module.exports = {
    data: new SlashCommandBuilder()
    .setName("transférer")
    .setDescription("transfert un certain montant d'argent à un autre utilisateur **(administateur seulement)**")
    .setDMPermission(false)
    .addUserOption(
        option => option
        .setName("user")
        .setDescription("utilisateur à qui vous voulez transférer de l'argent")
        .setRequired(true)
    )
    .addNumberOption(
        option => option
        .setName("montant")
        .setDescription("montant d'argent à transférer au compte bancaire de l'utilisateur")
        .setRequired(true)
        .setMinValue(1)
    ),
    async execute (interaction) {
        const user = interaction.member.user
        const target = interaction.options.getUser("user")
        amount = interaction.options.getNumber("montant")
        userData = await User.findOne({ id: user.id }) || new User({ id: user.id }),
        targetData = await User.findOne({ id: target.id }) || new User({ id: target.id })
        embed = new EmbedBuilder()

        const amountInCash = amount - userData.Banque

        if (userData.Cash < amount) return interaction.reply({
            embeds: [embed
                .setDescription(`❌ \` ${user.username} \` vous ne possédez pas cette somme, il vous manquent **${formatter.format(amountInCash)}$**`)
                .setColor(Colors.Red)
                .setFooter({text: "🏦 Pacific Bank 🏦"})
            ],
        })

        userData.Cash -= amount
        targetData.Cash += amount
        userData.save()
        targetData.save()

        return interaction.reply({
            embeds: [ embed
                .setDescription(`✅ \` ${user.username} \` à transférer **${amount}$** à \` ${target.username} \``)  
                .setColor(Colors.Green)
            ],
        })
    }
}