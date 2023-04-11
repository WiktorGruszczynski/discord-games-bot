const { Schema, model} = require("mongoose");

const WellcomeSchema = new Schema({
    _id: Schema.Types.ObjectId,
    guildId: String,
    channelId: String,
    welcome_msg: {type: String, default: "Welcome <USER>!"},
    leave_msg: {type: String, default: "Goodbyte <USER>!"}
})

folder_name = "welcome_channels"


module.exports = model("WelcomeSchema", WellcomeSchema, folder_name)