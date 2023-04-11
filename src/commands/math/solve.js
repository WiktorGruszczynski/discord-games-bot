const math = require("../../functions/math_functions")
const { EmbedBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder } = require("discord.js");


function ctg(value){
    return 1/Math.tan(value)
}


function parse(text)
{  
    return text
        .replaceAll("^","**")
        .replaceAll("sqrt","Math.sqrt")
        .replaceAll('sin', 'Math.sin')
        .replaceAll('cos', 'Math.cos')
        .replaceAll('tan', 'Math.tan')
        .replaceAll('log', 'Math.log')
        .replaceAll('log10', 'Math.log10')
        .replaceAll('π', Math.PI)
        .replaceAll('e', Math.E)
        .replace(/(\d+)!/g, (_, num) => math.factorial(parseInt(num)))
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName("solve")
        .setDescription("Solves math problems")
    .addStringOption(option=>
        option
            .setName("expression")
            .setDescription("math expression, equation, any string to calculate")
            .setRequired(true)),
        
    execute: async (client, interaction) => 
    {
        const {options} = interaction
        var expression = options.getString("expression").replaceAll(/\s/g, "").replaceAll('pi','π')
        const embed = new EmbedBuilder().setColor(0xffa500)
        let answer = ''


        if (expression.includes("y=") || expression.includes("f(x)=")){
            
            if (expression.includes("x^2")){
                solutions = math.quadratic_function(expression)

                if (solutions == null){
                    answer="No solutions"
                }
                else if (solutions.length==2){
                    answer = `${solutions[0]}, ${solutions[1]} `
                }
                else if (solutions.length==1){
                    answer = `${solutions[0]} `
                } 

                answer = `**Function**: ${expression}\n\n**Solutions**: ${answer}`
                embed.setTitle("Quadratic function")

            }
            else if (expression.includes("x")){
                answer = math.linear_function(expression).toString()
                answer = `**Function**: ${expression}\n\n**Solution**: ${answer}`
                embed.setTitle("Linear function")
            }
            
        }
        else {
            const expression_buffer = parse(expression)

            try{
                if (expression_buffer.includes("/0")){
                    embed.setTitle("Cannot divide by zero").setDescription(expression)

                    return await interaction.reply({embeds: [embed]})
                }

                if (expression_buffer.includes("0**0")){
                    embed.setTitle("Cannot calculate 0^0 power").setDescription(expression)

                    return await interaction.reply({embeds: [embed]})
                }


                answer = `${expression} = ${eval(expression_buffer)}`
                embed.setTitle("Math solution ")
  
            }
            catch (err){
                embed.setTitle("Invalid data")
                embed.setDescription(expression)
                return await interaction.reply({embeds: [embed]})
            }
        }

        if (!answer){
            embed.setColor(0xff0000)
            embed.setTitle("Something went wrong")
        }
        else{
            embed.setDescription(answer)
        }

        return await interaction.reply({embeds: [embed]})
    }
}