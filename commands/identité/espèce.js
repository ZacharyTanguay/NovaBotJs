const { SlashCommandBuilder } = require("@discordjs/builders")
const { Client, GatewayIntentBits, AttachmentBuilder, EmbedBuilder } = require("discord.js")
const { User } = require("C:/NovaBotJs/utils/schema.js")
const Canvas = require('@napi-rs/canvas');

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 3,
    minimumSignificantDigits: 3,
  });

module.exports = {
    data: new SlashCommandBuilder()
    .setName("espèce")
    .setDescription("regarde combien d'argent vous avez sur vous")
    .addUserOption(
        option => option
        .setName("user")
        .setDescription("utilisateur dont l'argent doit être regardé")
    ),
    run: async (interaction, client, message) => {
        const user = interaction.options.getUser("user") || interaction.member.user
        userData = await User.findOne({ id: user.id }) || new User({ id: user.id })

        const applyText = (canvas, text) => {
            const context = canvas.getContext('2d');
        
            // Declare a base size of the font
            let fontSize = 44;
        
            do {
                context.font = `${fontSize -= 10}px sans-serif`;
            } while (context.measureText(text).width > canvas.width - 300);
        
            return context.font;
        };

        const canvas = Canvas.createCanvas(798, 522);
		const context = canvas.getContext('2d');
        const background = await Canvas.loadImage('C:/NovaBotJs/images/cash1.png');
        context.drawImage(background, 0, 0 , canvas.width, canvas.height);
        
        context.font = applyText(canvas, `${formatter.format(userData.banque)}`);
        context.fillStyle = '#000000';
        //context.fillText(formatter.format(userData.Cash), 320, 180); cash3.png
        
        
        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });

        const embedCarteBancaire = new EmbedBuilder ()
        .setAuthor({name: user.tag, iconURL: user.displayAvatarURL()})
        .setColor("#E67E22")
        .setImage("attachment://profile-image.png")

        if (userData.carteIdentité == true) {
            await interaction.reply({ embeds: [embedCarteBancaire] ,files: [attachment] })
        } else {
            await interaction.reply("vous n'avez pas de carte d'identité")
        }
    }
}