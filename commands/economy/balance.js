const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { User } = require("C:/NovaBotJs/utils/economy.js")

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 3,
    minimumSignificantDigits: 3,
  });

module.exports = {
    data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("affiche vos informations bancaire")
    .addUserOption(
        option => option
        .setName("user")
        .setDescription("utilisateur dont les informations bancaires doivent être affichée")
    ),
    run: async (interaction) => {
        const user = interaction.options.getUser("user") || interaction.member.user
        const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })

        const balanceEmbed = new EmbedBuilder ()
        .setAuthor({name: user.tag, iconURL: user.displayAvatarURL()})
        .setColor("#E67E22")
        .setThumbnail(`https://static.wikia.nocookie.net/gtawiki/images/0/08/PacificStandardBank-GTAV-Logo.png/revision/latest?cb=20160921165509`)
        .addFields(
            { name: "💵 \` | ESPÈCE \`" ,value: ` ${formatter.format(userData.Cash)} ` },
            { name: "💳 \` | CRÉDIT \`", value: ` ${formatter.format(userData.Banque)} `},
            { name: "💰 \` | TOTAL \`", value: ` ${formatter.format(userData.Cash + userData.Banque)} `},
        )
        .setTimestamp()
        .setFooter({text: "🏦 Pacific Bank 🏦"})
        
        return interaction.reply({
            embeds: [ balanceEmbed ]
        })
    }
}