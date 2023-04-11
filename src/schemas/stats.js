const { Schema, model} = require("mongoose");

const StatSchema = new Schema({
    _id: Schema.Types.ObjectId,
    guildId: String,
    countId: {type: String, deafult: ""},
    bannedId: {type: String, deafult: ""},
    boostsId: {type: String, deafult: ""}
})

folder_name = "stats"

module.exports = model("StatSchema", StatSchema, folder_name)