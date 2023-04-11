const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ttt")
        .setDescription("tictactoe command")
        .addUserOption(option=>
            option
                .setName("user")
                .setDescription("user that will play against you")
                .setRequired(true)),
    execute: async(client, interaction) => {
        const {options, user} = interaction;
        const user2 = options.getUser("user")

        if (user2.bot) return await interaction.reply({content: "Second player can't be a bot!", ephemeral: true})

        const players = {cross: user, circle: user2}
        const board = createBoard()

        var move = ["cross", "circle"][Math.round(Math.random())]

        const start_embed = new EmbedBuilder()
            .setTitle("TicTacToe")
            .setDescription(`<@${user.id}> vs <@${user2.id}> \n<@${players[move].id}> **moves first!**`)
            .setColor(0xd9a426)

        const initialMessage = await interaction.reply({components: board, embeds: [start_embed], fetchReply: true})
        const collector = initialMessage.createMessageComponentCollector({interaction, time: 1000*60*6})

        collector.on("collect", async(interaction) => {
            id = interaction.customId;
            if (players[move].id == interaction.user.id)
            {
                if (interaction.component.data.label == '\u200b')
                {
                    if (move == "cross")
                    {
                        symbol = "❌"
                        move = "circle"
                        style = ButtonStyle.Danger
                    }
                    else
                    {
                        symbol = "⭕"
                        move = "cross"
                        style = ButtonStyle.Primary
                    }

                    y = Number(id[0])
                    x = Number(id[1])

                    board[y].components[x] = new ButtonBuilder()
                        .setCustomId(interaction.customId)
                        .setLabel(symbol)
                        .setStyle(style)

                    await interaction.update({components: board})

                    array = board.map(row => row.components.map(component=>component.data.label))
                    winner = checkWin()

                    if (winner)
                    {
                        const embed = new EmbedBuilder()
                            .setTitle("TicTacToe results")
                            .setDescription(`<@${players[winner].id}> won!`)
                            .setColor(0xf9a426)

                        await interaction.channel.send({embeds: [embed]})
                        collector.stop()
                    }

                }
                else
                {
                    await interaction.reply({content: "This box has been already clicked", ephemeral: true})
                }
            }
            else
            {
                await interaction.reply({content: "It's not your turn!", ephemeral: true})
            }
        })

    }
}

function checkWin()
{
    var winner;

    for (const row of array)
    {
        if (row[0]==row[1] && row[1]==row[2] && row[2]!='\u200b')
        {
            winner = row[0]
        }
    }

    for (var i=0; i<3; i++)
    {
        if (array[0][i] == array[1][i] && array[1][i] == array[2][i] && array[2][i] != '\u200b')
        {
            winner = array[0][i]
        }
    }


    if (array[0][0] == array[1][1] && array[1][1]==array[2][2] && array[2][2]!='\u200b')
    {
        winner = array[0][0]
    }

    if (array[0][2]==array[1][1] && array[1][1] == array[2][0] && array[2][0]!=`\u200b`)
    {
        winner = array[0][2]
    }

    if (winner=="⭕")
    {
        return "circle"
    }
    if (winner=="❌")
    {
        return "cross"
    }

}

function createBoard()
{
    const rows = []

    for (var i=0; i<3; i++)
    {
        var row = new ActionRowBuilder()
        for (var j=0; j<3; j++)
        {
            row.addComponents(
                new ButtonBuilder()
                    .setCustomId(`${i}${j}`)
                    .setLabel('\u200b')
                    .setStyle(ButtonStyle.Secondary)
            )
        }
        rows.push(row)
    }
    return rows
}