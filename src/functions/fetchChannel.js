const Channel = require("../schemas/channel")
const {Types} = require("mongoose")


module.exports = async (channelId, TextChannelId, guildId, channel_name) => 
{
    var channel = await Channel.findOne({guildId: guildId, TextChannelId: TextChannelId, channelId:channelId});
    
    if (!channel)
    {
        channel = new Channel({
            _id: new Types.ObjectId(),
            guildId: guildId,
            channelId: channelId,
            TextChannelId: TextChannelId,
            name: channel_name
        })

        await channel.save().then(async () => {console.log("Added new channel to listener")})
    }

    return channel
}