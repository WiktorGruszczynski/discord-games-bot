const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetchWallet = require("../../functions/fetchWallet");
const getWallet = require("../../functions/getWallet");
const pretify = require("../../functions/pretify")


module.exports = {
    data: new SlashCommandBuilder()
        .setName("balance")
        .setDescription("displays user balance")
        .addUserOption(option=>
            option
                .setName("target")
                .setDescription("user's balance to display"))
        ,
    execute: async (client, interaction) => 
    {
        const {options, guild} = interaction;
        const user = options.getUser("target") || interaction.user;
        var wallet = await getWallet(user.id, guild.id)
        
        if (!wallet)
        {
            if (user.id==interaction.user.id){
                await fetchWallet(user.id, guild.id)
                var wallet = await getWallet(user.id, guild.id)
            }
            else
            {
                const embed = new EmbedBuilder()
                    .setTitle("Selected user does not have a wallet")
                    .setColor(0xff0000)

                return await interaction.reply({embeds: [embed], ephemeral: true})
            }
        }

        const balance = wallet.balance
        const amount = pretify(balance)


        const embed = new EmbedBuilder()
            .setColor(0x12b10d)
            .setTitle(`${user.username}'s balance`)
            .setDescription(`wallet: ${amount} $`)
            .setThumbnail(user.displayAvatarURL())


        return await interaction.reply({embeds: [embed]})

    }
}