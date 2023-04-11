const { Schema, model} = require("mongoose");

const ChannelSchema = new Schema({
    _id: Schema.Types.ObjectId,
    guildId: String,
    channelId: String,
    TextChannelId: String,
    name: String
});

folder_name = "youtube_channels"

module.exports = model("ChannelSchema", ChannelSchema, folder_name)