const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("returns pong"),
    execute: async (client, interaction) => {
        return await interaction.reply("pong!")
    }
}