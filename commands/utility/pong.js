const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
    category: 'utility',
    data: new SlashCommandBuilder()
        .setName('pong')
        .setDescription('Replies with Ping!'),
    async execute(interaction) {
        await interaction.reply('Ping!');
    },
};