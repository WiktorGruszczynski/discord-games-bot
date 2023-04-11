const Channel = require("../schemas/channel")

module.exports = async (channelId, TextChannelId, guildId) => 
{
    return await Channel.findOneAndDelete({guildId: guildId, TextChannelId: TextChannelId, channelId:channelId});
}