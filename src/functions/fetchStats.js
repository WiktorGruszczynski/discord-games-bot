const Stats = require("../schemas/stats")
const {Types} = require("mongoose")

module.exports = async (guildId)=>
{
    new_stats = new Stats({
        _id: new Types.ObjectId(),
        guildId: guildId,
    })
        
    await new_stats.save().catch(console.error)
    return new_stats
}