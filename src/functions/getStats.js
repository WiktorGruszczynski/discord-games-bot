const Stats = require("../schemas/stats")

module.exports = async (guildId) => {
    var stats =  await Stats.findOne({guildId: guildId});
    return stats
}