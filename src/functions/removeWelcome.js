const Welcome = require("../schemas/welcome")

module.exports = async (channelId, guildId) => 
{
    return await Welcome.findOneAndDelete({guildId: guildId, channelId:channelId});
}