const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags, EmbedBuilder} = require('discord.js');
const ms = require('ms');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    category: 'management',
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a user from the server')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to ban')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for the ban')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction){
        const banUser = interaction.options.getUser('user');
        const banReason = interaction.options.getString('reason') || 'No reason provided';

        const member = await interaction.guild.members.fetch(banUser.id).catch(() => null);
        // Check if the user is member on this server
        if(!member){
            return interaction.reply({content: '❌ User is not in this server', flags: MessageFlags.Ephemeral });
        }

        //Check if the bot has the permission to ban
        if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.BanMembers)){
            return interaction.reply({content: '❌ I do not have permission to ban members.', flags: MessageFlags.Ephemeral});
        }

        await interaction.guild.bans.create(banUser.id, {reason: banReason}).catch(err => {
            return interaction.reply({content: '❌ Error banning this user', flags: MessageFlags.Ephemeral });
        });

        const embed = new EmbedBuilder()
            .setTitle('Ban has been Succesful')
            .addFields(
                {
                    name: 'Member:',
                    value: `${banUser} | ${banUser.id}`
                },
                {
                    name: 'Reason',
                    value: `" **${banReason}** "`
                }
            )
            .setTimestamp()
            .setColor('Red')

        await interaction.reply({embeds: [embed] });
    }

}