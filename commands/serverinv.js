const { SlashCommandBuilder } = require('@discordjs/builders')
var Long = require('long')
const Discord = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinv')
        .setDescription('Generate an invite link for this server'),
    async execute(interaction) {
        function getDefaultChannel(guild) {
            if (guild.channels.cache.some(name1 => name1.name === 'general')) { return guild.channels.cache.find(name => name.name === 'general') }
            // Now we get into the heavy stuff: first channel in order where the bot can speak
            // hold on to your hats!
            return guild.channels.cache
                .filter(c => c.type === 'GUILD_TEXT' &&
                    c.permissionsFor(guild.client.user).has(Discord.Permissions.FLAGS.SEND_MESSAGES))
                .sort((a, b) => a.position - b.position ||
                    Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber())
                .first()
        }
        getDefaultChannel(interaction.guild).createInvite({ maxAge: 300 }).then(inv => interaction.reply(inv.url ? inv.url : 'discord.gg/' + inv.code))
    }
}