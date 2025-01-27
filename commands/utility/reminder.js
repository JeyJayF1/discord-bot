const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const ms = require('ms');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    cooldown: 5,
    category: 'utility',
    data: new SlashCommandBuilder()
        .setName('reminder')
        .setDescription('Reminds you after a set time!')
        .addIntegerOption(option => option
            .setName('duration')
            .setDescription('How long to wait till you get reminded')
            .setRequired(true)),
    async execute(interaction) {

        const durationUser = interaction.options.getInteger('duration');
        const msDuration = ms(durationUser + 's');

        if(isNaN(msDuration)){
            await interaction.reply({ content: 'Please provide a valid duration!', flags: MessageFlags.Ephemeral});
        }

        try {
            const {default: prettyMs} = await import('pretty-ms');
            await interaction.reply({ content: `Will be reminded in ${prettyMs(msDuration, {verbose: true})}`, flags: MessageFlags.Ephemeral});
            await wait(msDuration)
            await interaction.editReply('This is your reminder!');
        } catch (err) {
            console.log(`Error while setting reminder: ${err}`);
        }
    },
};