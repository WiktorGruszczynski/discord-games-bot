const { SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const  getWallet  = require("../../functions/getWallet");
const  roulette  = require("../../functions/roulette");
const pretify = require("../../functions/pretify")
const clc = require("cli-color")


const emojis = {
    black: "⬛",
    red: "🟥",
    green: "🟩"
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("bet")
        .setDescription("bets on roulette color")
        .addIntegerOption(option=> 
            option.setName("amount").
                setDescription("amount of money to bet").
                setRequired(true))
        .addStringOption(option=>
            option
                .setName("color")
                .setDescription("color to bet on")
                .setRequired(true)),


    execute: async(client, interaction) => {
        const {options, user, guild} = interaction;
        const amount = Math.abs(options.getInteger("amount"));
        const color = options.get("color").value;


        const embed = new EmbedBuilder()
            .setColor(0xff0000)
            .setFooter({
                text: user.tag,
                iconURL: user.avatarURL()
            })
            .setTimestamp()

        if (amount==0){
                embed.setTitle("Something went wrong")
                .setDescription("Value of your bet must be greater than 0")
                return await interaction.reply({embeds: [embed]})
            }


        const colors_array = ["red", "black", "green"]
        if (!colors_array.includes(color)) 
        {
            embed.setTitle("Something went wrong")
            embed.setDescription("Passed color must be red, black or green")
            return await interaction.reply({embeds: [embed], ephemeral: true})
        }
        
        var user_account = await getWallet(user.id, guild.id)
        if (!user_account) 
        {
            embed.setTitle("Something went wrong")
            embed.setDescription("You don't have a balance yet. Use `/balance` command to create one")
            return await interaction.reply({embeds: [embed], ephemeral: true})
        }
        if (user_account.balance < amount) 
        {
            embed.setTitle("Something went wrong")
            embed.setDescription("You don't have enough funds in your account")
            return await interaction.reply({embeds: [embed], ephemeral: true})
        }

        user_account.balance -= amount
        
        const spin_result = roulette()
        if (spin_result.color == color){
            if (color=="red" || color=="black"){
                user_account.balance += amount*2
            }
            else if(color=="green"){
                user_account.balance += amount*10
            }
            embed.setColor(0x00ff00)
            .setTitle("Win")
            .addFields([
                {
                    name: "Profit",
                    value: `**${pretify(amount)}$**`
                }
            ])
        }
        else{
            embed.setColor(0xff0000)
            .setTitle("Loss")
            .addFields([
                {
                    name: "Loss",
                    value: `**-${pretify(amount)}$**`
                }
            ])
        }

        embed.addFields({
            name: "Balance",
            value: `${pretify(user_account.balance)}$`
        },
        {
            name: "Drawn color",
            value: emojis[spin_result.color]
        })

        await interaction.reply({embeds: [embed]})
        await user_account.save().then(async balance => {
            console.log(clc.cyanBright(`[Balance Updated]: UserID: ${balance.userId}, GuildID: ${balance.guildId}`))
        }).catch(console.error)
    }
}