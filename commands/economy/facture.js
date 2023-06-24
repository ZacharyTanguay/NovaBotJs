const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, Colors, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require("discord.js")
const { User } = require("../../Database/Schema/user.js")

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

module.exports = {
    data: new SlashCommandBuilder()
    .setName("facture")
    .setDescription("envoie une facture à un utilisateur")
    .addUserOption(
        option => option
        .setName("user")
        .setDescription("utilisateur à qui vous voulez envoyer")
        .setRequired(true)
    )
    .addNumberOption(
        option => option
        .setName("montant")
        .setDescription("montant d'argent que vous souhaitez facturer **(montant minimum de 1$)**")
        .setRequired(true)
        .setMinValue(1)
    )
    .addStringOption(
        option => option
        .setName("raison")
        .setDescription("raison de la facture")
        .setRequired(true)
    ),
    async execute (interaction) {
        const user = interaction.member.user
        const target = interaction.options.getUser("user")
        amount = interaction.options.getNumber("montant")
        userData = await User.findOne({ id: user.id }) || new User({ id: user.id }),
        targetData = await User.findOne({ id: target.id }) || new User({ id: target.id })
        embed = new EmbedBuilder()

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('accepter')
            .setLabel('Accepter')
            .setStyle(ButtonStyle.Secondary)
        )
        .addComponents(
             new ButtonBuilder()
            .setCustomId('refuser')
            .setLabel('Refuser')
            .setStyle(ButtonStyle.Secondary),
        );
        embeds: [ embed
            .setColor(Colors.Orange)
            .setTitle('\`Facture\` 💵')
            .setDescription(`**${target.username}** vous avez reçu une facture d'un montant s'élevant à **${formatter.format(amount)}** de **${user.username}**. \n\nLa raison de cette dernière :\n**${interaction.options.getString("raison")}** ! \n\n__Acceptez-vous de payer cette facture__ ?`)
            .setTimestamp()
            .setFooter({text: "🧾"})
        ],

        interaction.reply({ embeds: [embed], components: [row] });
        const collector =  interaction.channel.createMessageComponentCollector({ time: 90000 });
        collector.on("collect", async (i) => {
            await i.deferUpdate();
    
            if (i.user.id !== target.id) {
                embeds: [ embed
                    .setColor(Colors.Yellow)
                    .setTitle(" ")
                    .setDescription(`**${user.username}** cette facture ne vous est pas adressée !`)
                    .setTimestamp()
                    .setFooter({text: "⚠️"})
                ]
                return i.followUp({ embeds: [embed], ephemeral: true });
            }
            if (i.customId == "accepter") {
                embeds: [ embed
                    .setColor(Colors.Green)
                    .setTitle(" ")
                    .setDescription(`**${user.username}** vous avez payé une facture de **${formatter.format(amount)}** à **${target.username}**`)
                    .setTimestamp()
                    .setFooter({text: "✅"})
                ]
                row.components[0].setDisabled(true)
                row.components[1].setDisabled(true)
                userData.Cash -= amount
                userData.save()
                targetData.Cash += amount
                targetData.save()
                interaction.editReply({ embeds: [embed], components: [row]});
            }
            if (i.customId == "refuser") {
                embeds: [ embed
                    .setColor(Colors.Red)
                    .setTitle(" ")
                    .setDescription(`**${user.username}** vous avez refuser de payé une facture de **${formatter.format(amount)}** à **${target.username}** !`)
                    .setTimestamp()
                    .setFooter({text: "❌"})
                ],
                row.components[0].setDisabled(true)
                row.components[1].setDisabled(true)
                interaction.editReply({ embeds: [embed], components: [row]});
            }
            collector.stop();
        });
      }
}