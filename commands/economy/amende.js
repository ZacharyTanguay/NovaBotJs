const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, Colors, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require("discord.js")
const { User } = require("C:/NovaBotJs/utils/schema.js")
const { v4: uuidv4 } = require('uuid');
const conf = require("C:/NovaBotJs/config/embed.json")

uuidv4();

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
        amount = interaction.options.getNumber("montant")
        userData = await User.findOne({ id: user.id }) || new User({ id: user.id }),
        targetData = await User.findOne({ id: target.id }) || new User({ id: target.id })

        const amendeEmbed = new EmbedBuilder()
        .setColor(conf.serveur)
        .setDescription(`**${target.username}** vous avez reçu une amende d'un montant s'élevant à **${formatter.format(amount)}** de **${user.username}**. \n\nLa raison de cette dernière :\n**${interaction.options.getString("raison")}** ! \n\n__Acceptez-vous de payer cette amende__ ?`)
        .setFooter({text: "🧾"})

        let message = await interaction.reply({embeds: [amendeEmbed], fetchReply: true})

        const accepter = new ButtonBuilder()
        .setCustomId(message.id + "accepter")
        .setLabel("Accepter")
        .setStyle(ButtonStyle.Secondary)

        const refuser = new ButtonBuilder()
        .setCustomId(message.id + "refuser")
        .setLabel("Refuser")
        .setStyle(ButtonStyle.Secondary)

        let row = new ActionRowBuilder()
        .addComponents(
            accepter
        )
        .addComponents(
            refuser
        )
        
        interaction.editReply({embeds: [amendeEmbed], components: [row], fetchReply: true})
        const collector = interaction.channel.createMessageComponentCollector({ time: 60000 });
        collector.on('collect', async ButtonInteraction => {
            
            if (target.id != ButtonInteraction.user.id) {
                const wrongUser = new EmbedBuilder()
                .setColor(conf.avertissement)
                .setDescription(`**${user.username}** cette amende ne vous est pas adressée !`)
                .setFooter({text: "⚠️"})

                interaction.followUp({ embeds:[wrongUser], components:[], ephemeral: true })
            }

            if (ButtonInteraction.customId == message.id + "accepter" && target.id == ButtonInteraction.user.id) {
                await ButtonInteraction.deferUpdate();
                const accepterEmbed = new EmbedBuilder()
                .setColor(conf.accepter)
                .setDescription(`**${user.username}** vous avez payé une amende de **${formatter.format(amount)}** à **${target.username}**`)
                .setFooter({text: "✅"})

                targetData.Cash -= amount
                targetData.save()
                
                interaction.editReply({embeds: [accepterEmbed], components: []})
            }

            if (ButtonInteraction.customId == message.id + "refuser" && target.id == ButtonInteraction.user.id) {
                await ButtonInteraction.deferUpdate();
                const refuserEmbed = new EmbedBuilder()
                .setColor(conf.refuser)
                .setDescription(`**${user.username}** vous avez refusé de payer une amende de **${formatter.format(amount)}** à **${target.username}**`)
                .setFooter({text: "❌"})

                interaction.editReply({embeds: [refuserEmbed], components: []})
            }
        });
        collector.on('end', collected => {console.log(`Collected ${collected.size} items`); collector.stop()});
      }
}