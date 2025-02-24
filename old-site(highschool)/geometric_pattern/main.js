var num_circles = 15;
var circleDiameter;
var circleRadius;
var rVal;
var gVal;
var bVal;

function setup(){
    createCanvas(480,600);
    frameRate(5);
    circleRadius = circleDiameter/2;
    rVal = 255;
    gVal = 0;
    bVal = 0;
}

function draw(){
    circleDiameter = width/num_circles;
    
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
            stroke(color(rVal, gVal, bVal));
            ellipse(x, y, circleDiameter, circleDiameter);
            x = x + Math.random() * (50 - 1) + 1;
        }
        
        y = y - Math.random() * (50 - 1) + 1;
        isShifted = !isShifted;
        
        rVal = (rVal+Math.random() * (100 - 1) + 1) % 256;
        gVal = (gVal+Math.random() * (100 - 1) + 1) % 256;
        bVal = (bVal+Math.random() * (100 - 1) + 1) % 256;
        //rVal = (rVal+254) % 256;
        //gVal = (gVal+7) % 256;
        //bVal = (bVal+3) % 256;
        // rVal = rVal - 2;
        // gVal = gVal + 7;
        // bVal = bVal + 3;
    }
}

function moreCircles(){
    num_circles = num_circles + 1;
}

$("#more").on("click", moreCircles());