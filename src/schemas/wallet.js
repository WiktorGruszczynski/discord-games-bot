const { Schema, model} = require("mongoose");

const WalletSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userId: String,
    guildId: String,
    guildName: String,
    bonusTimeStamp: {type: Number, default: new Date().getTime()},
    balance: {type: Number, default: 1000}
})

folder_name = "wallets"


module.exports = model("WalletSchema", WalletSchema, folder_name)