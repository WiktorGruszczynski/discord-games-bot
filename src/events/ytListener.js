const Channel = require("../schemas/channel")
const yt = require("../functions/youtube");



module.exports = async (client, interval, message) =>
{
    setInterval(async ()=>{
        channels_list = await Channel.find()
        for (const channel of channels_list)
        {
            const channel_id = channel.channelId;
            const video = await yt.LatestVideo(channel_id);
            if (!video) continue;

            now = new Date().getTime();
            
            //check if video was uploaded in last [DURATION OF INTERVAL HERE] 
            if (now < video.timestamp+interval)
            {
                //new video!
                const text_channel = await client.channels.fetch(channel.TextChannelId);
                await text_channel.send({content: `${message}${video.url}`});
            }
        }
    }, interval*1000)
}