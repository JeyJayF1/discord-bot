const { SlashCommandBuilder, PermissionsBitField, MessageFlags} = require('discord.js');
const ms = require('ms');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    cooldown: 5,
    category: 'management',
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Timeout a user!')
        .addUserOption(option => option
            .setName('user')
            .setDescription('The user to timeout')
            .setRequired(true))
        .addStringOption(option => option
            .setName('duration')
            .setDescription('The duration of the timeout in seconds')
            .setRequired(true))
        .addStringOption(option => option
            .setName('reason')
            .setDescription('Reason for the timeout')),
    async execute(interaction) {

        const timeoutUser = interaction.options.getUser('user');
        const timeoutMember = await interaction.guild.members.fetch(timeoutUser.id);
        const duration = interaction.options.getString('duration');
        const timeoutReason = interaction.options.getString('reason') || 'No reason provided';

        const durationMs = ms(duration + 's');
        // Check if time is valid
        if(isNaN(durationMs)){
            return await interaction.reply({content: 'Please provide a valid timeout duration', flags: MessageFlags.Ephemeral});
        }
        if(durationMs < 5000 || durationMs > 2.419e9){
            return await interaction.reply({content: 'Cannot timeout for less than 5 seconds or more than 28 days', flags: MessageFlags.Ephemeral});
        }

        // Check permissions before using command
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)){
            return await interaction.reply({content : 'Need to be a moderator for this command', flags: MessageFlags.Ephemeral});
        }
        // Check if user is member of server
        if (!timeoutMember){
            return await interaction.reply({content: 'The user is no member of this server', flags: MessageFlags.Ephemeral});
        }
        // Check if timoutUser has same or above role
        if (!timeoutMember.kickable){
            return await interaction.reply({content: 'User has the same or above role!', flags: MessageFlags.Ephemeral});
        }
        // Cannot timeout yourself
        if(interaction.member.id === timeoutMember.id) {
            return await interaction.reply({content: 'You cannot timeout yourself!', flags: MessageFlags.Ephemeral});
        }
        // Cannot timeout a bot
        if (timeoutMember.user.bot){
            return await interaction.reply({content: 'You cannot timeout a bot!', flags: MessageFlags.Ephemeral});
        }

        try {
            const {default: prettyMs} = await import('pretty-ms');
            if(timeoutMember.isCommunicationDisabled()){
                await timeoutMember.timeout(durationMs, timeoutReason);
                return await interaction.reply(`${timeoutMember}'s timeout has been updated to ${prettyMs(durationMs, {verbose: true})}`);
            }

            await timeoutMember.timeout(durationMs, timeoutReason);
            return interaction.reply(`${timeoutMember} has been timed out for ${prettyMs(durationMs, {verbose: true})}.\nReason: ${timeoutReason}`);

        } catch (error) {
            console.log(`Error while using timeout: ${error}`);
        }

    },
};