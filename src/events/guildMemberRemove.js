const getWelcome = require("../functions/getWelcome");

module.exports = async (member) => {
    const {guild} = member;
    const welcome_channel = await getWelcome(guild.id)

    if (welcome_channel)
    {
        const channels = await guild.channels.fetch();
        var channel = await channels.get(welcome_channel.channelId);
        return await channel.send(welcome_channel.leave_msg.replace("<USER>",member.displayName))
    }
}