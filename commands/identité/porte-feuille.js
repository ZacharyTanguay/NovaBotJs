const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, Colors, ButtonStyle, ButtonBuilder, ActionRowBuilder, ComponentType } = require("discord.js")
const { User } = require("C:/NovaBotJs/utils/schema.js")

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

module.exports = {
    data: new SlashCommandBuilder()
    .setName("porte-feuille")
    .setDescription("ouvre ton porte-feuille"),
    run: async (interaction, client, message) => {
        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });
        const user = interaction.member.user
        userData = await User.findOne({ id: user.id }) || new User({ id: user.id }),
        embed = new EmbedBuilder()

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('ESPÈCE')
            .setLabel('ESPÈCE')
            .setStyle(ButtonStyle.Secondary)
        )
        .addComponents(
             new ButtonBuilder()
            .setCustomId('CARTE BANCAIRE')
            .setLabel('CARTE BANCAIRE')
            .setStyle(ButtonStyle.Secondary),
        );
        embeds: [ embed
            .setColor(Colors.Orange)
            .setTitle('\`Amende\` 💵')
            .setDescription(`**${target.username}** vous avez reçu une amende d'un montant s'élevant à **${formatter.format(amount)}** de **${user.username}**. \n\nLa raison de cette dernière :\n**${interaction.options.getString("raison")}** ! \n\n__Acceptez-vous de payer cette amende__ ?`)
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
                    .setDescription(`**${user.username}** cette amende ne vous est pas adressée !`)
                    .setTimestamp()
                    .setFooter({text: "⚠️"})
                ]
                return i.followUp({ embeds: [embed], ephemeral: true });
            }
            if (i.customId == "accepter") {
                embeds: [ embed
                    .setColor(Colors.Green)
                    .setTitle(" ")
                    .setDescription(`**${user.username}** vous avez payé une amende de **${formatter.format(amount)}** à **${target.username}**`)
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
                    .setDescription(`**${user.username}** vous avez refuser de payé une amende de **${formatter.format(amount)}** à **${target.username}** !`)
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