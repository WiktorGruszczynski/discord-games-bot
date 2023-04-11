const randomAnime = require("../../functions/randomAnime")
const { SlashCommandBuilder, EmbedBuilder, InteractionType } = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("anime")
        .setDescription("returns random anime"),
    execute: async (client, interaction) => {
        const {user} = interaction;
        const anime = await randomAnime();

        if (anime.airing){
            var airing = "Airing"
        }
        else{
            var airing = "Finished"
        }


        const embed = new EmbedBuilder()
            .setTitle(anime.title)
            .setURL(anime.url)
            .setDescription(anime.description.split("\n\n")[0])
            .addFields(
                {name: "⭐**Rating:**", value: `${anime.score}/10`, inline:true},
                {name: "🎞️**Episodes:**", value: `${anime.episodes}`, inline: true},
                {name: "⌛**Status:**", value: `${airing}`, inline: true},
                {name: "⏱️**Episode duration:**", value: anime.duration.replace('min per ep','min'), inline: true},
                {name: "📅**Started:**", value: anime.start, inline:true},
            )
            .setImage(anime.thumbnail);

        if (anime.end != "null-null-null"){
            embed.addFields({name: "🗓️**Ended:**", value: `${anime.end}`, inline:true})
        }
        else{
            embed.addFields({name: "\u200b", value: "\u200b", inline: true})
        }

        if (anime.genres){
            embed.addFields({name: "**Genres:**", value: anime.genres.map(genre=>`[${genre.name}](${genre.url})`).join(', ')})
        }
        
        if (anime.studios){
            embed.addFields({name: "**Studios:**", value: anime.studios.map(studio=>`[${studio.name}](${studio.url})`).join(', ')})
        }

        if (interaction.type == InteractionType.ApplicationCommand){
            return await interaction.reply({content: `<@${user.id}> Random anime for you is:`, embeds: [embed]})
        }
    }
}