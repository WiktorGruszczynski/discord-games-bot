const Wallet = require("../schemas/wallet")
const {Types} = require("mongoose")
const clc = require("cli-color")


module.exports = async (userId, guildId)=>
{
    var storedWallet = await Wallet.findOne({userId: userId, guildId: guildId})

    if (!storedWallet){
        storedWallet = await new Wallet({
            _id: new Types.ObjectId(),
            userId:  userId,
            guildId: guildId,
        })
        

        await storedWallet.save().then(async () => {
            console.log(clc.cyan(`[Balance Created]: UserID: ${userId}, GuildID: ${guildId}`))
        }).catch(console.error)

    }
    
    return storedWallet;
}


