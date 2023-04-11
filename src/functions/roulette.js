module.exports = () =>{
    
    const black_boxes = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35];
    const red_boxes = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
    
    number=Math.ceil(Math.random()*37)-1;

    if (black_boxes.includes(number)) var color = "black";
    if (red_boxes.includes(number)) var color = "red";
    if (number==0) var color = "green";

    return {
        color: color,
        value: number
    }
}