const Channel = require("../schemas/channel")


module.exports = async (channelId, TextChannelId, guildId) => {
    var channel = await Channel.findOne({guildId: guildId, TextChannelId: TextChannelId, channelId:channelId})
    return channel
}