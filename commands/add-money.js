const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, Colors } = require("discord.js")
const { User } = require("../utils/schemas")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("add-money")
    .setDescription("ajouter un montant d'argent à un utilisateur (administateur seulement)")
    .addUserOption(
        option => option
        .setName("user")
        .setDescription("La personne à qui vous voulez ajouter de l'argent")
        .setRequired(true)
    )
    .addNumberOption(
        option => option
        .setName("amount")
        .setDescription("montant à ajouter à l'utilisateur")
        .setRequired(true)
        .setMinValue(1)
    ),
    run: async (interaction) => {
        const user = interaction.member.user
        const target = interaction.options.getUser("user")
        amount = interaction.options.getNumber("amount")
        userData = await User.findOne({ id: user.id }) || new User({ id: user.id }),
        embed = new EmbedBuilder()

        userData.Cash += amount
        userData.save()

        return interaction.reply({
            embeds: [ embed
                .setDescription(`${user} à donner \` ${amount}$ \` à ${target}`)  
                .setColor(Colors.Orange)
            ],
        })
    }
}