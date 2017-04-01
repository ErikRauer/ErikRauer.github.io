//Who's turn it is. true = O, false = X
var currentTurn = true;

//Field data
//[row][column][Whether the cell is owned, Who owns the cell, Top left X value, Top left Y value]
var rows = [[[false, ""], [false, ""], [false, ""]], 
            [[false, ""], [false, ""], [false, ""]], 
            [[false, ""], [false, ""], [false, ""]]];
// var topRow = [topL, topM, topR];
// var middleRow = [middleL, middleM, middleR];
// var bottomRow = [bottomL, bottomM, bottomR];

//Cell data
//[Whether the cell is owned, Who owns the cell]
// var topL = [true, ""];
// var topM = [true, ""];
// var topR = [true, ""];
// var middleL = [true, ""];
// var middleM = [true, ""];
// var middleR = [true, ""];
// var bottomL = [true, ""];
// var bottomM = [true, ""];
// var bottomR = [true, ""];

//Called when the player clicks on a cell
function clickCell(row, column){
    if (rows[row][column][0] == true){
        textSize(32);
        text("Cell is already in use", 25, 25);
    } else {
        strokeWeight(5);
        
        if (currentTurn){
            switch(rows[row][column]){
                case rows[0][0]:
                    ellipse(width/6, height/6, width/3, height/3);
                    break;
                case rows[0][1]:
                    ellipse(width/2, height/6, width/3, height/3);
                    break;
                case rows[0][2]:
                    ellipse((width/6)*5, height/6, width/3, height/3);
                    break;
                case rows[1][0]:
                    ellipse(width/6, height/2, width/3, height/3);
                    break;
                case rows[1][1]:
                    ellipse(width/2, height/2, width/3, height/3);
                    break;
                case rows[1][2]:
                    ellipse((width/6)*5, height/2, width/3, height/3);
                    break;
                case rows[2][0]:
                    ellipse(width/6, (height/6)*5, width/3, height/3);
                    break;
                case rows[2][1]:
                    ellipse(width/2, (height/6)*5, width/3, height/3);
                    break;
                case rows[2][2]:
                    ellipse((width/6)*5, (height/6)*5, width/3, height/3);
                    break;
                default:
                    textSize(32);
                    text("Error", 25, 25);
            }
            rows[row][column][1] = "O";
            currentTurn = false;
        } else {
            switch(rows[row][column]){
                case rows[0][0]:
                    line(0, 0, width/3, height/3);
                    line(0, height/3, width/3, 0);
                    break;
                case rows[0][1]:
                    line(width/3, 0, (width/3)*2, height/3);
                    line(width/3, height/3, (width/3)*2, 0);
                    break;
                case rows[0][2]:
                    line((width/3)*2, 0, width, height/3);
                    line((width/3)*2, height/3, width, 0);
                    break;
                case rows[1][0]:
                    line(0, height/3, width/3, (height/3)*2);
                    line(0, (height/3)*2, width/3, height/3);
                    break;
                case rows[1][1]:
                    line(width/3, height/3, (width/3)*2, (height/3)*2);
                    line(width/3, (height/3)*2, (width/3)*2, height/3);
                    break;
                case rows[1][2]:
                    line((width/3)*2, height/3, width, (height/3)*2);
                    line((width/3)*2, (height/3)*2, width, height/3);
                    break;
                case rows[2][0]:
                    line(0, (height/3)*2, width/3, height);
                    line(0, height, width/3, (height/3)*2);
                    break;
                case rows[2][1]:
                    line(width/3, (height/3)*2, (width/3)*2, height);
                    line(width/3, height, (width/3)*2, (height/3)*2);
                    break;
                case rows[2][2]:
                    line((width/3)*2, (height/3)*2, width, height);
                    line((width/3)*2, height, width, (height/3)*2);
                    break;
                default:
                    textSize(32);
                    text("Error", 25, 25);
            }
            rows[row][column][1] = "X";
            currentTurn = true;
        }
        
        rows[row][column][0] = true;
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    line(width/3, 0, width/3, height);
    line((width/3)*2, 0, (width/3)*2, height);
    line(0, height/3, width, height/3);
    line(0, (height/3)*2, width, (height/3)*2);
}

function draw() {
}

function mouseClicked() {
    if (mouseX < width/3 && mouseY < height/3){
        clickCell(0,0);
    } else if(mouseX < width/3 && mouseY < (height/3)*2){
        clickCell(1,0);
    } else if(mouseX < width/3 && mouseY < height){
        clickCell(2,0);
    } else if(mouseX < (width/3)*2 && mouseY < height/3){
        clickCell(0,1);
    } else if(mouseX < (width/3)*2 && mouseY < (height/3)*2){
        clickCell(1,1);
    } else if(mouseX < (width/3)*2 && mouseY < height){
        clickCell(2,1);
    } else if(mouseX < width && mouseY < height/3){
        clickCell(0,2);
    } else if(mouseX < width && mouseY < (height/3)*2){
        clickCell(1,2);
    } else if(mouseX < width && mouseY < height){
        clickCell(2,2);
    }
}