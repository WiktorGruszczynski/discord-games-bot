const { EmbedBuilder } = require("@discordjs/builders");

module.exports = async (client, interaction) => {
    if (interaction.isChatInputCommand())
    {
        let command_name = interaction.commandName.toLowerCase()
        const command = client.commands.get(command_name)

        if (typeof(command) === 'object')
        {   
            try
            {
                command.execute(client, interaction).catch(async (err) => {
                console.log(err)
                const embed = new EmbedBuilder()
                    .setTitle("Something went wrong")
                    .setColor(0xff0000)

                await interaction.reply({embeds: [embed]})
            });
            }
            catch(err){
                console.log(err);
            }
        }
    }
}