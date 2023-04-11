const Welcome = require("../schemas/welcome")
const {Types} = require("mongoose")


module.exports = async (channelId, guildId) => 
{
    var channel = await Welcome.findOne({guildId: guildId, channelId:channelId});
    
    if (!channel)
    {
        channel = new Welcome({
            _id: new Types.ObjectId(),
            guildId: guildId,
            channelId: channelId,
        })

        await channel.save().then(async () => {console.log("Added new welcome channel to listener")})
    }

    return channel
}