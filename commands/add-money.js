const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, Colors, PermissionsBitFields, Message, GatewayIntentBits } = require("discord.js")
const { User } = require("../utils/economy")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("add-money")
    .setDescription("ajoute un certain montant d'argent à un utilisateur **(administateur seulement)**")
    .setDMPermission(false)
    .addUserOption(
        option => option
        .setName("user")
        .setDescription("utilisateur à qui vous voulez ajouter de l'argent")
        .setRequired(true)
    )
    .addNumberOption(
        option => option
        .setName("amount")
        .setDescription("montant d'argent à ajouter au compte bancaire de l'utilisateur")
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

        targetData.Cash += amount
        targetData.save()

        interaction.get

        return interaction.reply({
            embeds: [ embed
                .setDescription(`✅ Le membre du staff \` ${user.username} \` à donner **${amount}$** à \` ${target.username} \``)  
                .setColor(Colors.Green)
            ],
        })
    }
}