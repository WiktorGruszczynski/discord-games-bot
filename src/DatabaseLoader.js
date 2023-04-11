const clc = require("cli-color");
const {mongoose} = require("mongoose");
require('dotenv').config()



module.exports = async () =>{
    await mongoose.connect(process.env.DATABASE_TOKEN).catch(console.error)
    .then(console.log(clc.magentaBright("Connected to MongoDB database")));
};
