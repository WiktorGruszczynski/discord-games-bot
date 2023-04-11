const wallets = require("../schemas/wallet")


module.exports = async (userId, guildId) => {
    var wallet = await wallets.findOne({userId: userId, guildId: guildId})
    return wallet
}