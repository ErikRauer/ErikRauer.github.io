var NUM_CIRCLES = 15;
var circleDiameter;
var circleRadius;

function setup(){
    createCanvas(480,600);
    circleDiameter = width/NUM_CIRCLES;
    circleRadius = circleDiameter/2;
}

function draw(){
    var y = 0;
    var isShifted = false;
    //Make grid of Circles
    while(y <= height){
        
        var x;
        if (isShifted){
            x = circleRadius;
        }else{
            x = 0;
        }
        while(x <= width){
            ellipse(x, y, circleDiameter, circleDiameter);
            x = x + circleDiameter;
        }
        
        y = y + circleRadius;
        isShifted = !isShifted;
    }
}