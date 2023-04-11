const { SlashCommandBuilder, EmbedBuilder, ChannelType} = require("discord.js");
const getChannel = require("../../functions/getChannel")
const fetchChannel = require("../../functions/fetchChannel")
const removeChannel = require("../../functions/removeChannel")
const yt = require("../../functions/youtube")


module.exports = {
    data: new SlashCommandBuilder()
        .setName("youtube")
        .setDescription("youtube command")
        .addSubcommand(subcommand=>
            subcommand
                .setName("add")
                .setDescription("adds youtube channel to get notifications about new videos")
                .addStringOption(option=>
                    option
                        .setName("id")
                        .setDescription("youtube channel id")
                        .setRequired(true))
                .addChannelOption(option=>
                    option
                        .setName('textchannel')
                        .setDescription("Text channel where all notifications will be displayed")
                        .addChannelTypes(ChannelType.GuildText)
                        .setRequired(false)))
        .addSubcommand(subcommand=>
            subcommand
                .setName("remove")
                .setDescription("disable notifications from youtube channel")
                .addStringOption(option=>
                    option
                        .setName("id")
                        .setDescription("youtube channel id")
                        .setRequired(true))
                .addChannelOption(option=>
                    option
                        .setName('textchannel')
                        .setDescription("Text channel where all notifications will be displayed")
                        .addChannelTypes(ChannelType.GuildText)
                        .setRequired(true)))

        ,
    execute: async (client, interaction) => {
        const {options, guild} = interaction;
        const yt_channel_id = options.getString("id");
        const text_channel = options.getChannel("textchannel") || interaction.channel;


        const subcommand = options.getSubcommand()
        const embed = new EmbedBuilder()
            .setColor(0xff0000)

        if (subcommand == "add")
        {   
            info = await yt.ChannelInfo(yt_channel_id)
            fetchChannel(yt_channel_id, text_channel.id, guild.id, info.title)

            embed
                .setTitle("Added new channel")
                .setDescription(`Name: ᲼**[${info.title}](https://www.youtube.com/${yt_channel_id})**\nId: ᲼**${yt_channel_id}**\nSubscribers: ᲼**${info.subscribers}**`)
                .setThumbnail(info.avatar.url)
                .setImage(info.banner.url)

        }
        if (subcommand == "remove")
        {
            info = await yt.ChannelInfo(yt_channel_id)
            removeChannel(yt_channel_id, text_channel.id, guild.id)

            embed
                .setTitle("Removed channel")
                .setDescription(`Removed ${info.title}`)
                .setThumbnail(info.avatar.url)
                .setImage(info.banner.url)
        }


        return await interaction.reply({embeds: [embed]})
    }
}