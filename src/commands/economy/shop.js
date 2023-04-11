const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("shop")
        .setDescription("Displays shop items")
        
        ,
    execute: async (client, interaction) => {
        const {user, guild} = interaction;


        const shopItems = [[
            { name: ':pizza:Pizza', price: 20},
            { name: ':hamburger:Burger', price: 15},
            { name: '🍎Apple', price: 5},
            { name: ':carrot:Carrot', price: 6},
            { name: '🥞Pancakes', price: 8},
            { name: '🍫Chocolate', price: 10},
            { name: '🍪Cookie', price: 5},
            { name: '🍩Donut', price: 8},
        ],
        [
            { name: ':dagger:Sword', price: 100},
            { name: ':axe:Axe', price: 80},
            { name: ':fire:Fireball', price: 160},
            { name: ':shield:Shield', price: 50},
            { name: '🔨Hammer', price: 80},
            { name: '💣Bomb', price: 200},
            { name: '🔫Gun', price: 150},
            { name: '💊Healing pill', price: 50},
        ]
    ];

    
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('prev')
                    .setLabel('Previous')
                    .setStyle(ButtonStyle.Primary)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('next')
                    .setLabel('Next')
                    .setStyle(ButtonStyle.Primary) 
            )


        const embed = new EmbedBuilder()
            .setTitle("Shop")
            .setColor(0x0b61b1)

        shopItems[0].forEach(item => {
            embed.addFields({name:`${item.name} - $${item.price}`, value:'\u200b', inline: false});
        });
        
        embed.addFields({name: "\u200b", value: "Use `/buy item_name` to purchase a product🛒"})

        const initialMessage = await interaction.reply({embeds: [embed], components: [row],fetchReply: true})


        var page = 0;


        const filter = (interaction) => true; 
        const collector = initialMessage.createMessageComponentCollector({filter, time: 1000*1800})

        collector.on('collect', async (interaction) => {
            customId = interaction.customId
            if (customId == "next" || customId == "prev")
            {
                if (customId == "next"){
                    if (page<shopItems.length-1) page+=1;
                }
                if (customId == "prev"){
                    if (page>0) page-=1;
                }

                const EditedEmbed = new EmbedBuilder()
                    .setTitle("Shop")
                    .setColor(0x0b61b1)

                shopItems[page].forEach(item => {
                    EditedEmbed.addFields({name:`${item.name} - $${item.price}`, value:'\u200b', inline: false});
                });
                    
                EditedEmbed.addFields({name: "\u200b", value: "Use `/buy item_name` to purchase a product🛒"})
                
                await interaction.update({embeds: [EditedEmbed]})
            }
        })
    }
}