module.exports = (number) =>{
    number = String(number)
    buffer = ""
    
    for (var i = number.length-1; i>=0; --i)
    {
        buffer = number[i]+buffer
        if ((number.length-i)%3==0 && i>0){
            buffer= " "+buffer
        }
    }

    return buffer
}