//Who's turn it is. true = O, false = X
var currentTurn = true;

//Field data
//[row][column][Whether the cell is owned, Who owns the cell, Top left X value, Top left Y value]
var rows = [];

var numberInput;
var submitButton;
var numberOfSquares;
var canvasExist = false;
var columnWidth, columnHeight;

//Called when the player clicks on a cell
function clickCell(row, column){
    //If the cell is already used, write text
    if (rows[row][column][0] == true){
        textSize(32);
        text("Cell is already in use", 25, 25);
    } else {
        strokeWeight(5);
        
        if (currentTurn) {
            ellipse(((column + 1) * columnWidth) - (columnWidth / 2), ((row + 1) * columnHeight) - (columnHeight / 2), columnWidth, columnHeight);
            currentTurn = false;
        } else {
            line(columnWidth * column, columnHeight * row, columnWidth * (column + 1), columnHeight * (row + 1));
            line(columnWidth * column, columnHeight * (row + 1), columnWidth * (column + 1), columnHeight * row);
            currentTurn = true;
        }
        
        rows[row][column][0] = true;
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

function createField() {
    for (var row = 0; row < numberOfSquares; row++) {
        rows.push([]);
        for (var column = 0; column < numberOfSquares; column++) {
            rows[row].push([false, ""]);
        }
    }
    for (var row = 1; row < numberOfSquares; row++) {
        line(0, columnHeight*row, width, columnHeight*row);
    }
    for (var column = 1; column < numberOfSquares; column++) {
        line(columnWidth*column, 0, columnWidth*column, height);
    }
}

function setup() {
    createCanvas(1,1);
    
    numberInput = createInput();
    numberInput.position(100, 100);
    submitButton = createButton("Submit");
    submitButton.position(231, 100);
    // submitButton.mousePressed(submitStuff);
    
    //Draw the field
    // line(width/3, 0, width/3, height);
    // line((width/3)*2, 0, (width/3)*2, height);
    // line(0, height/3, width, height/3);
    // line(0, (height/3)*2, width, (height/3)*2);
}

function draw() {
    // if (canvasExist) {
    //     submitButton.position(-100. -100);
    // //     resizeCanvas(windowWidth, windowHeight);
    // //     text(numberOfSquares, 50, 50);
    // //     columnWidth = width/numberOfSquares;
    // //     createField();
    // //     canvasExist = false;
    // }
    // checkForWin();
}
//fix pls;
function submitStuff() {
    numberOfSquares = numberInput.value();
    resizeCanvas(windowWidth, windowHeight);
    columnWidth = width/numberOfSquares;
    columnHeight = height/numberOfSquares;
    numberInput.position(-100, -100);
    submitButton.position(-100. -100);
    createField();
    // canvasExist = true;
}

function keyPressed() {
    if (keyCode == ENTER) {
        submitStuff();
    }
}

function mousePressed() {
    // //The position of the mouse when it's clicked will determine which cell is used
    // if (mouseX < width/3 && mouseY < height/3){
    //     clickCell(0,0);
    // } else if(mouseX < width/3 && mouseY < (height/3)*2){
    //     clickCell(1,0);
    // } else if(mouseX < width/3 && mouseY < height){
    //     clickCell(2,0);
    // } else if(mouseX < (width/3)*2 && mouseY < height/3){
    //     clickCell(0,1);
    // } else if(mouseX < (width/3)*2 && mouseY < (height/3)*2){
    //     clickCell(1,1);
    // } else if(mouseX < (width/3)*2 && mouseY < height){
    //     clickCell(2,1);
    // } else if(mouseX < width && mouseY < height/3){
    //     clickCell(0,2);
    // } else if(mouseX < width && mouseY < (height/3)*2){
    //     clickCell(1,2);
    // } else if(mouseX < width && mouseY < height){
    //     clickCell(2,2);
    // }
    
    var rowClicked, columnClicked;
    rowClicked = Math.floor(mouseY / columnHeight);
    columnClicked = Math.floor(mouseX / columnWidth);
    clickCell(rowClicked, columnClicked);
}