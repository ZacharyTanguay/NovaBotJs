const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { User } = require("../../utils/schema.js")
const { moneyFormat } = require("../../handlers/functions.js")
const embed = require("../../config/embed.json")

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
        .setColor(embed.serveur)
        .setThumbnail(`https://static.wikia.nocookie.net/gtawiki/images/0/08/PacificStandardBank-GTAV-Logo.png/revision/latest?cb=20160921165509`)
        .addFields(
            { name: "💵 \` | ESPÈCE \`" ,value: ` ${moneyFormat(userData.Cash)} ` },
            { name: "💳 \` | BANQUE \`", value: ` ${moneyFormat(userData.Banque)} `},
            { name: "💰 \` | TOTAL \`", value: ` ${moneyFormat(userData.Banque + userData.Cash)} `},
        )
        .setTimestamp()
        .setFooter({text: "🏦 Pacific Bank 🏦"})
        
        return interaction.reply({
            embeds: [ balanceEmbed ]
        })
    }
}