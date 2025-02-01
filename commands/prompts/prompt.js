const { SlashCommandBuilder, ChatInputCommandInteraction, MessageFlags } = require('discord.js');
const Queue = require('../../queue/queue.js');

const queue = new Queue();

module.exports = {
    category: 'prompts',
    data: new SlashCommandBuilder()
        .setName('prompt')
        .setDescription('Send a prompt to our LLM')
        .addStringOption(option =>
        option.setName('input')
            .setDescription('The prompt you want to send')
            .setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply({flags: MessageFlags.Ephemeral});
        queue.addItem(interaction);
    },
};