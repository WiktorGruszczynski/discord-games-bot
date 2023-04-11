const { SlashCommandBuilder, ChannelType, EmbedBuilder} = require("discord.js");
const getWelcome = require("../../functions/getWelcome");
const fetchWelcome = require("../../functions/fetchWelcome")
const removeWelcome = require("../../functions/removeWelcome");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("welcome")
        .setDescription("command for working with new members welcome messages on server")
        .addSubcommand(subcommand=>
            subcommand
                .setName("add")
                .setDescription("enables welcome messages on choosen channel")
                .addChannelOption(option=>
                    option
                        .setName("channel")
                        .setDescription("channel that will be showing all welcome messages")
                        .addChannelTypes(ChannelType.GuildText)
                        .setRequired(true)
                        )
        )
        .addSubcommand(subcommand=>
            subcommand
                .setName("remove")
                .setDescription("disables welcome messages on choosen channel")
                .addChannelOption(option=>
                    option
                        .setName("channel")
                        .setDescription("channel that will be showing all welcome messages")
                        .addChannelTypes(ChannelType.GuildText)
                        .setRequired(true)
                ))
        .addSubcommand(subcommand=>
            subcommand
                .setName("message")
                .setDescription("controls welcome or leave message content. Put <USER> in place of member's username")
                .addStringOption(option=>
                    option
                        .setName("welcome")
                        .setDescription("welcome message content"))
                .addStringOption(option=>
                    option
                        .setName("leave")
                        .setDescription("leave message content")))
                
        ,
    execute: async (client, interaction) => {
        const {options, guild} = interaction;
        const subcommand = options.getSubcommand()
        const channel = options.getChannel("channel")
        const embed = new EmbedBuilder()
            .setColor(0xff0000)

        if (subcommand == "add"){
            result = await getWelcome(guild.id)
            if (!result)
            {
                await fetchWelcome(channel.id, guild.id)
                embed.setTitle("Added new welcome channel")
                    .setDescription(`The channel is **${channel.name}**`)
            }
            else
            {
                embed.setTitle("You arleady added a welcome channel")
            }
        }
        else if (subcommand == "remove"){
            await removeWelcome(channel.id, guild.id)
            embed.setTitle("Removed welcome channel")
        }
        else if (subcommand == "message"){
            result = await getWelcome(guild.id)
            if (!result)
            {
                embed.setTitle("Welcome channel not found")
                    .setDescription("You have to add a welcome channel in order to edit message content")
            }
            else{
                welcome_option = options.getString("welcome")
                leave_option = options.getString("leave")
                
                if (welcome_option) result.welcome_msg = welcome_option;
                if (leave_option)  result.leave_msg = leave_option;
                
                await result.save().catch(console.error)

                embed.setTitle("Edited welcome message")
            }
        }


        return await interaction.reply({embeds: [embed], ephemeral: true})
    }
}