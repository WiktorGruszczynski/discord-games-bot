const { ActivityType } = require("discord.js");
const CommandsLoader = require("../CommandsLoader");
const DatabaseLoader = require("../DatabaseLoader");


module.exports = async (client) => {
    await CommandsLoader(client);
    await DatabaseLoader();

    client.user.setPresence({
        activities: [{type: ActivityType.Watching, name: "Anime🎉"}],
    })

    console.log("bot is online!")
    
}