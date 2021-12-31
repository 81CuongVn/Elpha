const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require('discord.js')
const Warning = require("../models/Warning")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("userwarning")
    .setDescription("sends user's warning")
    .addUserOption(option =>
        option.setName('user')
            .setDescription('user id')
            .setRequired(true)
    ),

    async execute(interaction) {
        if (interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES) || interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR) || interaction.user.id === '754381104034742415') {
            var user = interaction.options.getUser('user')
        const warning = await Warning.findOne({user_id: user.id , guild_id: interaction.guild.id})
		if (!warning) {
            interaction.reply(`${user.username} do not have any warnings`)
			return
		}else{
			const Embed = new Discord.MessageEmbed()
			.setColor("00FFFF")
			.setTitle(`${user.username}'s warnings`)
			.setDescription(`${warning.warning}`)
			.setThumbnail(user.displayAvatarURL())
			
			interaction.reply({
				embeds: [Embed] 
			})	
		  }
        }else{
            interaction.reply('Insufficant Permissions')
        }
    }
}
