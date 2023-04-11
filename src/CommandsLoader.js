const { REST, Routes, Collection } = require("discord.js")
const pathlib = require("node:path")
const fs = require("node:fs")
const clc = require("cli-color")
require('dotenv').config()



module.exports = async (client)  =>
{   
    const commands = []
    const rest = new REST({version: '10'}).setToken(process.env.TOKEN)
    const commands_path = pathlib.join(__dirname, "commands")
    

    client.commands = new Collection()
    console.log(clc.cyanBright("▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃"))
    for (const dir of fs.readdirSync(commands_path)){
        const dir_path = pathlib.join(commands_path, dir)
        
        for (const file of fs.readdirSync(dir_path).filter(file=>file.endsWith(".js")))
        {   
            try{
                const slashcmd = require(pathlib.join(dir_path, file))
                client.commands.set(slashcmd.data.name, slashcmd)
                commands.push(slashcmd.data.toJSON())

                console.log(clc.cyanBright(`▊ function [${slashcmd.data.name}]`.padEnd(39)+"▊"))
            }
            catch (error){
                console.log(clc.red(`Could not load function from ${file}`))
                console.log(error)
            }
        }
    }
    console.log(clc.cyanBright("▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃"))

    const guild_ids = client.guilds.cache.map(guild => guild.id)
    for (const guild_id of guild_ids)
    {
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, guild_id),
            {body: commands}
        )
    }
}