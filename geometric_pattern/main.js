var NUM_CIRCLES = 15;
var circleDiameter;
var circleRadius;
var rVal;
var gVal;
var bVal;

function setup(){
    createCanvas(480,600);
    circleDiameter = width/NUM_CIRCLES;
    circleRadius = circleDiameter/2;
}

function draw(){
    rVal = 255;
    gVal = 0;
    bVal = 0;
    
    var y = height;
    var isShifted = false;
    //Make grid of Circles
    while(y >= 0){
        
        var x;
        if (isShifted){
            x = circleRadius;
        }else{
            x = 0;
        }
        while(x <= width){
            fill(color(rVal, gVal, bVal));
            stroke(color(0, 0, 0));
            ellipse(x, y, circleDiameter, circleDiameter);
            x = x + circleDiameter;
        }
        
        y = y - circleRadius;
        isShifted = !isShifted;
        
        // rVal = rVal-Math.random() * (10 - 1) + 1;
        // gVal = gVal+Math.random() * (10 - 1) + 1;
        // bVal = bVal+Math.random() * (10 - 1) + 1;
        rVal = rVal-2;
        gVal = gVal+7;
        bVal = bVal+3;
    }
}