const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, Colors, ButtonStyle, ButtonBuilder, ActionRowBuilder, ComponentType, AttachmentBuilder } = require("discord.js")
const { User } = require("../../Database/Schema/user.js")
const Canvas = require('@napi-rs/canvas');

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

module.exports = {
    data: new SlashCommandBuilder()
    .setName("porte-feuille")
    .setDescription("ouvre ton porte-feuille"),
    async execute (interaction) {
        const canvas = Canvas.createCanvas(798, 522);
		const context = canvas.getContext('2d');
        const background = await Canvas.loadImage('C:/NovaBotJs/images/cash3.png');
        context.drawImage(background, 0, 0 , canvas.width, canvas.height);
        
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

        interaction.reply({ components: [row], files: [attachment] });
      }
}