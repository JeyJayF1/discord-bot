const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const cyclopsEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Cyclops the leader of the X-Men')
    .setURL('https://marvel-filme.fandom.com/de/wiki/Scott_Summers')
    .setDescription('Cyclops is a superhero appearing in American comic books published by Marvel Comics and is a founding member of the X-Men.')
    .setThumbnail('https://upload.wikimedia.org/wikipedia/en/e/e9/Cyclops_%28Scott_Summers_circa_2019%29.png')
    .setImage('https://de.gizmodo.com/app/uploads/2024/03/8b04d828cf4511f16d2e6384ee763119-680x382.jpg')
    .setTimestamp();


module.exports = {
    cooldown: 10,
    category: 'utility',
    data: new SlashCommandBuilder()
        .setName('cyclops')
        .setDescription('Provides information about the GOAT!.'),
    async execute(interaction) {
        await interaction.reply({ embeds: [cyclopsEmbed]});
    },
};