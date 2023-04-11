const { Client, IntentsBitField} = require("discord.js");
const interactionCreate = require("./events/interactionCreate");
const ytListener = require("./events/ytListener")
const ready = require("./events/ready")
const guildMemberAdd = require("./events/guildMemberAdd");
const guildMemberRemove = require("./events/guildMemberRemove");
const statsListener = require("./events/statsListener");



require('dotenv').config()
const {TOKEN} = process.env


const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessageReactions,
    ]
})



client.on("ready",(client)=>ready(client));
client.on("guildMemberRemove", (member) => guildMemberRemove(member))
client.on("guildMemberAdd", (member) => guildMemberAdd(member));
client.on("interactionCreate", (interaction) => interactionCreate(client, interaction));
client.login(TOKEN);

statsListener(client)
ytListener(client, interval = (60*3), message="@everyone\nNew video on my channel\n");