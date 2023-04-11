module.exports = {
    quadratic_function,
    linear_function,
    factorial
}


function factorial(n)
{
    a = 1;
    for (var i=1; i<=n; i++){
        a = a*i;
    }

    return a
}


function parser(string)
{
    if (string.startsWith("y=")) string = string.substring(2)
    if (string.startsWith("f(x)=")) string = string.substring(5)

    var equation = []
    let buffer = ""

    for (const char of string)
    {
        if (buffer!=""){
        if (char=="+" || char=="-")
        {
            equation.push(buffer)
            buffer=""
        }  }
        buffer+=char
    }
    equation.push(buffer)

    args = [null, null, null]
    for (const element of equation)
    {
        if (element.includes("x^2")){
            args[0] = element.replace('x^2','')
        }
        else if (element.includes("x")){
            args[1] = element.replace('x','')
        }
        else{
            args[2] = Number(element)
        }}

        if (args[0]=="+"||args[0]==''){args[0]=1}
        if (args[0]=="-"){args[0]=-1}

        if (args[1]=="+"||args[1]==''){args[1]=1}
        if (args[1]=="-"){args[1]=-1}


    for (var i=0; i<3; i++){
        if (args[i]==null) {
            args[i]=0
        }
        else{
            args[i]=Number(args[i])
        }
    }
    return args
}


function quadratic_function(formula)
{   
    equation = parser(formula)    
    var delta = Math.pow(equation[1], 2) - 4*equation[0]*equation[2]
    
    if (delta>0)
    {
        return [(-equation[1]-Math.sqrt(delta))/(2*equation[0]), (-equation[1]+Math.sqrt(delta))/(2*equation[0])]
    }
    else if (delta==0)
    {
        var x0 = -equation[1]/(2*equation[0])
        if (x0==0) return [0]
        return [x0]
    }

    return null
}  


function linear_function(formula)
{
    equation = parser(formula)
    result = -equation[2]/equation[1]
    return result === -0 ? 0 : result;
}



