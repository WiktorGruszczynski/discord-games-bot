const Welcome = require("../schemas/welcome")
const {Types} = require("mongoose")


module.exports = async (guildId) => 
{
    return await Welcome.findOne({guildId: guildId});
}