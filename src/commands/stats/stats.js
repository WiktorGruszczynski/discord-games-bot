const { ChannelType } = require("discord-api-types/v10");
const { SlashCommandBuilder } = require("discord.js");
const fetchStats = require("../../functions/fetchStats");
const getStats = require("../../functions/getStats");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("stats")
        .setDescription("server statistics. Channel's name should ends with ':'")
        .addChannelOption(option=>
            option
                .setName("members")
                .setDescription("member count on server")
                .addChannelTypes(ChannelType.GuildVoice))
        .addChannelOption(option=>
            option
                .setName("banned")
                .setDescription("amount of banned members on server")
                .addChannelTypes(ChannelType.GuildVoice))
        .addChannelOption(option=>
            option
                .setName("boosts")
                .setDescription("amount of members boosting this server")
                .addChannelTypes(ChannelType.GuildVoice))
        
    ,
    execute: async (client, interaction) => {
        const {options, guild} = interaction;
        const members_channel = options.getChannel("members")
        const banned_channel = options.getChannel("banned")
        const boosts_channel = options.getChannel("boosts")
        
        stats = await getStats(guild.id)
        if (!stats) stats = await fetchStats(guild.id);

        if (members_channel){
            stats.countId = members_channel.id
        }

        if (banned_channel){
            stats.bannedId = banned_channel.id
        }

        if (boosts_channel){
            stats.boostsId = boosts_channel.id
        }

        await stats.save()
    }
}