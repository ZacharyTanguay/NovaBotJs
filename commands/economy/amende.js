const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, ComponentType, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require("discord.js")
const { moneyFormat } = require("../../handlers/functions.js")
const { User } = require("../../models/userSchema.js")
const conf = require("C:/NovaBotJs/config/embed.json")


var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

module.exports = {
    data: new SlashCommandBuilder()
    .setName("amende")
    .setDescription("Envoie une amende à un utilisateur")
    .addUserOption(
        option => option
        .setName("utilisateur")
        .setDescription("L'utilisateur verbalisé")
        .setRequired(true)
    )
    .addNumberOption(
        option => option
        .setName("montant")
        .setDescription("Le montant de l'amende")
        .setRequired(true)
    )
    .addStringOption(
        option => option
        .setName("raison")
        .setDescription("La raison de l'amende")
        .setRequired(true)
    ),
    run: async (interaction) => {
        const user = interaction.member.user
        const target = interaction.options.getUser("utilisateur")
        userData = await User.findOne({ id: user.id }) || new User({ id: user.id }),
        amount = interaction.options.getNumber("montant")
        targetData = await User.findOne({ id: target.id }) || new User({ id: target.id })

        const amendeEmbed = new EmbedBuilder()
        .setColor(conf.serveur)
        .setDescription(`**${target.username}** vous avez reçu une amende d'un montant s'élevant à **${moneyFormat(amount)}** de **${user.username}**.
        \n\nLa raison de cette dernière :\n**${interaction.options.getString("raison")}** ! \n\n__Acceptez-vous de payer cette amende__ ?`)
        .setFooter({text: "🧾 " + conf.point + " Amende"})

        let messageArray = []
        let message = await interaction.reply({embeds: [amendeEmbed], fetchReply: true})

        const accepter = new ButtonBuilder()
        .setCustomId(message.id + "accepter")
        .setLabel("Accepter")
        .setStyle(ButtonStyle.Secondary)

        const refuser = new ButtonBuilder()
        .setCustomId(message.id + "refuser")
        .setLabel("Refuser")
        .setStyle(ButtonStyle.Secondary)

        const annuler = new ButtonBuilder()
        .setCustomId(message.id + "annuler")
        .setLabel("Annuler")
        .setStyle(ButtonStyle.Secondary)

        let row = new ActionRowBuilder()
        .addComponents(
            accepter
        )
        .addComponents(
            refuser
        )

        await interaction.editReply({embeds: [amendeEmbed], components: [row], fetchReply: true})
        
        messageArray += message.id
        messageArray.save

        await interaction.editReply({embeds: [amendeEmbed], components: [row], fetchReply: true})
        const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, time: 60000, errors: ['time'] });
        collector.on('collect', async (ButtonInteraction) => {
            if (target.id != ButtonInteraction.user.id) {
                const wrongUser = new EmbedBuilder()
                .setColor(conf.avertissement)
                .setDescription(`**${user.username}** cette amende ne vous est pas adressée !`)
                .setFooter({text: conf.non_autoriser})

                await interaction.followUp({ embeds:[wrongUser], components:[], ephemeral: true })
                await interaction.editReply({ embeds:[wrongUser], components:[], ephemeral: true })
            }

            if (ButtonInteraction.customId == message.id + "accepter" && target.id == ButtonInteraction.user.id) {
                await ButtonInteraction.deferUpdate();
                amount = interaction.options.getNumber("montant")
                const accepterEmbed = new EmbedBuilder()
                .setColor(conf.accepter)
                .setDescription(`**${user.username}** vous avez payé une amende de **${formatter.format(amount)}** à **${target.username}**`)
                .setFooter({text: conf.transactionAccepter})
                .setFooter({text: "✅"})
                targetData.Cash -= amount
                targetData.save()
                
                await interaction.editReply({embeds: [accepterEmbed], components: []})
            }

            if (ButtonInteraction.customId == message.id + "refuser" && target.id == ButtonInteraction.user.id) {
                await ButtonInteraction.deferUpdate();
                amount = interaction.options.getNumber("montant")
                const refuserEmbed = new EmbedBuilder()
                .setColor(conf.refuser)
                .setDescription(`**${user.username}** vous avez refusé de payer une amende de **${formatter.format(amount)}** à **${target.username}**`)
                .setFooter({text: conf.transactionRefuser})

                await interaction.editReply({embeds: [refuserEmbed], components: []})
            }
        });
        collector.on('end', collected => {console.log(`Collected ${collected.size} items`); collector.stop()});
      }
}