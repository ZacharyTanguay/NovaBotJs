const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { User } = require("../utils/schemas")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Regardez votre solde bancaire")
    .addUserOption(
        option => option
        .setName("user")
        .setDescription("Personne dont vous voulez voir le solde")
    ),
    run: async (interaction) => {
        const user = interaction.options.getUser("user") || interaction.member.user
        const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })

        const balanceEmbed = new EmbedBuilder ()
        .setAuthor({name: user.tag, iconURL: user.displayAvatarURL()})
        .setColor("#E67E22")
        .setThumbnail(`https://static.wikia.nocookie.net/gtawiki/images/0/08/PacificStandardBank-GTAV-Logo.png/revision/latest?cb=20160921165509`)
        .addFields(
            { name: "💵 \` | ESPÈCE \`" ,value: ` $${userData.Cash} `, inline: true },
            { name: "💳 \` | CRÉDIT \`", value: ` $${userData.Banque} `, inline: true },
            { name: "💰 \` | TOTAL \`", value: ` $${userData.Cash + userData.Banque} `, inline: true },
        )
        
        return interaction.reply({
            embeds: [ balanceEmbed ]
        })
    }
}