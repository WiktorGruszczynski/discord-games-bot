const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const getWallet = require("../../functions/getWallet");



module.exports = {
    data: new SlashCommandBuilder()
        .setName("bonus")
        .setDescription("Daily free money bonus")
        
        ,
    execute: async (client, interaction) => {
        const {user, guild} = interaction;
        const embed = new EmbedBuilder()


        var wallet = await getWallet(user.id, guild.id)
        if (!wallet){
            embed
            .setColor(0xff0000)
            .setTitle("Something went wrong")
            .setDescription("You don't have a wallet! Use `/balance` to create one")
            return await interaction.reply({embeds: [embed], ephemeral: true})
        }

        time = new Date().getTime()

        if (time>wallet.bonusTimeStamp){
            wallet.balance += 100
            wallet.bonusTimeStamp = time + 86_400_000
            await wallet.save().then(async () => {
                embed.setColor(0xffd700)
                .setTitle("Succesfully added funds!")
                .setDescription(`Your new balance is **${wallet.balance}**$`)
                await interaction.reply({embeds: [embed], ephemeral: true})
            })
        }
        else{
            embed.setColor(0xff0000)
                .setTitle("Something went wrong")
                .setDescription("You have arleady used your daily bonus!")
            await interaction.reply({embeds: [embed], ephemeral: true})
        }
    }
}