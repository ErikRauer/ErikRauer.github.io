//Who's turn it is. true = O, false = X
var currentTurn = true;

var turnNumber = 1;
var playersTurn;
var aiType;

//Field data
//[row][column][Whether the cell is owned, Who owns the cell, Top left X value, Top left Y value]
var rows = [[[false, "1"], [false, "2"], [false, "3"]], 
            [[false, "4"], [false, "5"], [false, "6"]], 
            [[false, "7"], [false, "8"], [false, "9"]]];
// var topRow = [topL, topM, topR];
// var middleRow = [middleL, middleM, middleR];
// var bottomRow = [bottomL, bottomM, bottomR];

//Ai Info
var topL2;
var topM2;
var topR2;
var midL2;
var midR2;
var botL2;
var botM2;
var botR2;
var midAsX;

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
    //If the cell is already used, write text
    if (rows[row][column][0] == true){
        textSize(32);
        text("Cell is already in use", 25, 25);
    } else {
        strokeWeight(5);
        
        //If it's O's turn, draw the circle in the correct position
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
            //And change who's turn it is
            currentTurn = false;
            
        //If it's X's turn, draw the cross in the correct position
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
            //And change whos turn it is
            currentTurn = true;
        }
        
        rows[row][column][0] = true;
        turnNumber += 1;
    }
}

//Check if someone has won the game yet. If yes, display text.
function checkForWin() {
    textSize(32);
    if (rows[0][0][1] == rows[0][1][1] && rows[0][0][1] == rows[0][2][1]){
        text(rows[0][0][1] + " Won the Game!" , 75, 100);
        text("Reload page to restart", 50, 130);
    } else if (rows[1][0][1] == rows[1][1][1] && rows[1][0][1] == rows[1][2][1]){
        text(rows[1][0][1] + " Won the Game!" , 100, 100);
        text("Reload page to restart", 50, 130);
    } else if (rows[2][0][1] == rows[2][1][1] && rows[2][0][1] == rows[2][2][1]){
        text(rows[2][0][1] + " Won the Game!" , 100, 100);
        text("Reload page to restart", 50, 130);
    } else if (rows[0][0][1] == rows[1][0][1] && rows[0][0][1] == rows[2][0][1]){
        text(rows[0][0][1] + " Won the Game!" , 100, 100);
        text("Reload page to restart", 50, 130);
    } else if (rows[0][1][1] == rows[1][1][1] && rows[0][1][1] == rows[2][1][1]){
        text(rows[0][1][1] + " Won the Game!" , 100, 100);
        text("Reload page to restart", 50, 130);
    } else if (rows[0][2][1] == rows[1][2][1] && rows[0][2][1] == rows[2][2][1]){
        text(rows[0][2][1] + " Won the Game!" , 100, 100);
        text("Reload page to restart", 50, 130);
    } else if (rows[0][2][1] == rows[1][2][1] && rows[0][2][1] == rows[2][2][1]){
        text(rows[0][2][1] + " Won the Game!" , 100, 100);
        text("Reload page to restart", 50, 130);
    } else if (rows[0][0][1] == rows[1][1][1] && rows[0][0][1] == rows[2][2][1]){
        text(rows[0][0][1] + " Won the Game!" , 100, 100);
        text("Reload page to restart", 50, 130);
    } else if (rows[2][0][1] == rows[1][1][1] && rows[2][0][1] == rows[0][2][1]){
        text(rows[2][0][1] + " Won the Game!" , 100, 100);
        text("Reload page to restart", 50, 130);
    } 
}


function aiJob() {
    //If O...
    if (aiType == "O") {
        //Turn 1:
        if (turnNumber == 1){
            clickCell(1,1);
        //Turn 3:
        } else if (turnNumber == 3) {
            //Top Left
            if (rows[0][0][0] == true){
                clickCell(2,0);
                topL2 = true;
            }
            //Top Middle
            else if (rows[0][1][0] == true){
                clickCell(0,0);
                topM2 = true;
            }
            //Top Right
            else if (rows[0][2][0] == true){
                clickCell(0,0);
                topR2 = true;
            }
            //Middle Left
            else if (rows[1][0][0] == true){
                clickCell(0,0);
                midL2 = true;
            }
            //Middle Right
            else if (rows[1][2][0] == true){
                clickCell(2,2);
                midR2 = true;
            }
            //Bottom Left
            else if (rows[2][0][0] == true){
                clickCell(0,0);
                botL2 = true;
            }
            //Bottom Middle
            else if (rows[2][1][0] == true){
                clickCell(2,2);
                botM2 = true;
            }
            //Bottom Right
            else if (rows[2][2][0] == true){
                clickCell(2,0);
                botR2 = true;
            }
        }
        
        //Turn 5:
        else if (turnNumber == 5){
            //If opponent went Top Left on turn 2:
            if (topL2 == true){
                //If they didn't stop you...
                if (rows[0][2][0] == false) {
                    clickCell(0,2);
                } else {
                    clickCell(0,1);
                }
            }
            
            //If opponent went Top Middle on turn 2:
            else if (topM2 == true){
                //If they didn't stop you...
                if (rows[2][2][0] == false) {
                    clickCell(2,2);
                } else {
                    clickCell(1,0);
                }
            }
            
            //If opponent went Top Right on turn 2:
            else if (topR2 == true){
                //If they didn't stop you...
                if (rows[2][2][0] == false) {
                    clickCell(2,2);
                } else {
                    clickCell(1,2);
                }
            }
            
            //If opponent went Middle Left on turn 2:
            else if (midL2 == true){
                //If they didn't stop you...
                if (rows[2][2][0] == false) {
                    clickCell(2,2);
                } else {
                    clickCell(0,1);
                }
            }
            
            //If opponent went Middle Left on turn 2:
            else if (midR2 == true){
                //If they didn't stop you...
                if (rows[0][0][0] == false) {
                    clickCell(0,0);
                } else {
                    clickCell(2,1);
                }
            }
            
            //If opponent went Bottom Left on turn 2:
            else if (botL2 == true){
                //If they didn't stop you...
                if (rows[2][2][0] == false) {
                    clickCell(2,2);
                } else {
                    clickCell(2,1);
                }
            }
            
            //If opponent went Bottom Middle on turn 2:
            else if (botM2 == true){
                //If they didn't stop you...
                if (rows[0][0][0] == false) {
                    clickCell(0,0);
                } else {
                    clickCell(1,2);
                }
            }
            
            //If opponent went Bottom Right on turn 2:
            else if (botR2 == true){
                //If they didn't stop you...
                if (rows[0][2][0] == false) {
                    clickCell(0,2);
                } else {
                    clickCell(1,2);
                }
            }
        }
        
        //Post Turn 5:
        else {
            //If opponent went Top Left on turn 2:
            if (topL2 == true){
                if (rows[2][1][0] == false){
                    clickCell(2,1);
                } else if (turnNumber == 7){
                    clickCell(1,0);
                } else {
                    if (rows[1][2][0] == false){
                        clickCell(1,2);
                    } else {
                        clickCell(2,2);
                    }
                }
            }
            
            //If opponent went Top Middle on turn 2:
            if (topM2 == true){
                if (rows[2][0][0] == false){
                    clickCell(2,0);
                } else {
                    clickCell(1,2);
                }
            }
            
            //If opponent went Top Right on turn 2:
            if (topR2 == true){
                if (rows[1][0][0] == false){
                    clickCell(1,0);
                } else if (turnNumber == 7){
                    clickCell(0,1);
                } else {
                    if (rows[2][1][0] == false){
                        clickCell(2,1);
                    } else {
                        clickCell(2,0);
                    }
                }
            }
            
            //If opponent went Middle Left on turn 2:
            if (midL2 == true){
                if (rows[0][2][0] == false){
                    clickCell(0,2);
                } else {
                    clickCell(2,1);
                }
            }
            
            //If opponent went Middle Right on turn 2:
            if (midR2 == true){
                if (rows[2][0][0] == false){
                    clickCell(2,0);
                } else {
                    clickCell(0,1);
                }
            }
            
            //If opponent went Bottom Left on turn 2:
            if (botL2 == true){
                if (rows[0][1][0] == false){
                    clickCell(0,1);
                } else if (turnNumber == 7){
                    clickCell(1,0);
                } else {
                    if (rows[1][2][0] == false){
                        clickCell(1,2);
                    } else {
                        clickCell(0,2);
                    }
                }
            }
            
            //If opponent went Bottom Middle on turn2:
            if (botM2 == true){
                if (rows[1][0][0] == false){
                    clickCell(1,0);
                } else {
                    clickCell(0,2);
                }
            }
            
            //If opponent went Bottom Right on turn 2:
            if (botR2 == true){
                if (rows[1][0][0] == false){
                    clickCell(1,0);
                } else if (turnNumber == 7){
                    clickCell(0,1);
                } else {
                    if (rows[2][1][0] == false){
                        clickCell(2,1);
                    } else {
                        clickCell(0,0);
                    }
                }
            }
        }
    }
    //If X...
    else {
        //Turn 1
        if (turnNumber == 1){
            if (rows[1][1][0] == false) {
                
                clickCell(1,1);
                midAsX = true;
            } else {
                clickCell(0,0);
            }
        } else if (turnNumber == 3){
            if (midAsX) {
                
            }
        }
    }
    
    
    // if (rows[0][0][0] == false){
    //     clickCell(0,0);
    // } else if (rows[0][1][0] == false){
    //     clickCell(0,1);
    // } else if (rows[0][2][0] == false){
    //     clickCell(0,2);
    // } else if (rows[1][0][0] == false){
    //     clickCell(1,0);
    // } else if (rows[1][1][0] == false){
    //     clickCell(1,1);
    // } else if (rows[1][2][0] == false){
    //     clickCell(1,2);
    // } else if (rows[2][0][0] == false){
    //     clickCell(2,0);
    // } else if (rows[2][1][0] == false){
    //     clickCell(2,1);
    // } else if (rows[2][2][0] == false){
    //     clickCell(2,2);
    // }
}

function setup() {
    var detAi = Math.random();
    if (detAi < 0.5){
        aiType = "O";
        playersTurn = false;
    } else if (detAi >= 0.5){
        aiType = "X";
        playersTurn = true;
    }
    
    createCanvas(windowWidth, windowHeight);
    
    //Draw the field
    line(width/3, 0, width/3, height);
    line((width/3)*2, 0, (width/3)*2, height);
    line(0, height/3, width, height/3);
    line(0, (height/3)*2, width, (height/3)*2);
}

function draw() {
    if (playersTurn == false){
        aiJob();
        playersTurn = true;
    }
    checkForWin();
}

function mouseClicked() {
    //The position of the mouse when it's clicked will determine which cell is used
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
    
    playersTurn = false;
}