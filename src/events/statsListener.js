const getStats = require("../functions/getStats");

function short_num(number)
{
    if (number>1_000_000) return `${Math.round(number/1_000_00)/10}M`;
    if (number>1000) return `${Math.round(number/100)/10}K`;
    return number
}


module.exports = async (client) =>
{
    const interval = 50*6; //5 minutes
    setInterval(async () => {
        const guilds = client.guilds.cache.map(guild => guild);
        const channels = client.channels.cache.map(channel=>channel)

        for (const guild of guilds)
        {
            stats = await getStats(guild.id)
            if (stats)
            {
                if (stats.countId){
                    const channel = channels.filter(channel => channel.id == stats.countId)[0];
                    const new_name = `${channel.name.split(':')[0]}: ${short_num(guild.memberCount)}`;
                    if (new_name != channel.name) await channel.setName(new_name);
                }
                if (stats.bannedId){
                    const channel = channels.filter(channel => channel.id == stats.bannedId)[0];
                    let banned = await guild.bans.fetch()
                    const new_name = `${channel.name.split(':')[0]}: ${short_num(banned.size)}`;
                    if (new_name != channel.name) await channel.setName(new_name);
                }
                if (stats.boostsId){
                    const channel = channels.filter(channel => channel.id == stats.boostsId)[0];
                    const new_name = `${channel.name.split(':')[0]}: ${short_num(guild.premiumSubscriptionCount)}`;
                    if (new_name != channel.name) await channel.setName(new_name);
                }
            }
        }

    }, interval*1000)
}