var initialBallXPos = 0;
var initialBallYPos = 0;
var rVal = Math.random() * (255 - 1) + 1;
var gVal = Math.random() * (255 - 1) + 1;
var bVal = Math.random() * (255 - 1) + 1;
var maxSpeed = 5;
var minSpeed = 1;
restart = true;
var timer = 0;
var timerLap = 200;
var playerBallX;
var playerBallY;

class ball{
    
    constructor(x, y){
        this.xPos = x;
        this.yPos = y;
        this.ballXSpeed;
        this.ballYSpeed;
        this.rVal = Math.random() * (255 - 1) + 1;
        this.gVal = Math.random() * (255 - 1) + 1;
        this.bVal = Math.random() * (255 - 1) + 1;
    }
    
    initialize(){
        this.ballXSpeed = 1;
        this.ballYSpeed = 1;
    }
    
    move(){
        
        //Makes the balls move
        this.xPos += this.ballXSpeed;
        this.yPos += this.ballYSpeed;
        
        //Makes the balls max and min speed increase after certain amounts of time
        if (timer > timerLap){
            maxSpeed += 1;
            minSpeed += 1;
            timerLap += 200;
        }
        
        //Makes the balls bounce off edges
        if (this.yPos >= height){
            this.ballYSpeed = (Math.random() * (maxSpeed - minSpeed) + minSpeed) * -1;
            rVal = Math.random() * (255 - 1) + 1;
            gVal = Math.random() * (255 - 1) + 1;
            bVal = Math.random() * (255 - 1) + 1;
        }
        if (this.yPos <= 0){
            this.ballYSpeed = (Math.random() * (maxSpeed - minSpeed) + minSpeed);
            rVal = Math.random() * (255 - 1) + 1;
            gVal = Math.random() * (255 - 1) + 1;
            bVal = Math.random() * (255 - 1) + 1;
        }
        if (this.xPos >= width){
            this.ballXSpeed = (Math.random() * (maxSpeed - minSpeed) + minSpeed) * -1;
            rVal = Math.random() * (255 - 1) + 1;
            gVal = Math.random() * (255 - 1) + 1;
            bVal = Math.random() * (255 - 1) + 1;
        }
        if (this.xPos <= 0){
            this.ballXSpeed = (Math.random() * (maxSpeed - minSpeed) + minSpeed);
            rVal = Math.random() * (255 - 1) + 1;
            gVal = Math.random() * (255 - 1) + 1;
            bVal = Math.random() * (255 - 1) + 1;
        }
        
        //If ball collides with player, stop game
        if (this.xPos - 25 <= playerBallX + 25 && this.xPos + 25 >= playerBallX - 25 && this.yPos - 25 <= playerBallY + 25 && this.yPos + 25 >= playerBallY - 25){
            fill(0, 0, 0);
            text("Game Over", 50, 50);
            text("Score: " + timer, 50, 70);
            draw.restart();
        }
    }
}

function setup(){
    createCanvas(640, 480);
    ball1 = new ball(100, 100);
    ball2 = new ball(400, 300);
    ball1.initialize();
    ball2.initialize();
}

function draw(){
    timer += 1;
    playerBallX = mouseX;
    playerBallY = mouseY;
    
    if(mouseX > 640 || mouseX < 0){
        playerBallX = 320;
        playerBallY = 240;
    }else if(mouseY > 480 || mouseY < 0){
        playerBallY = 240;
        playerBallX = 320;
    }
    
    background(255, 255, 255);
    fill(255, 0 ,0);
    ellipse(playerBallX, playerBallY, 50, 50);
    fill(rVal, gVal, bVal);
    ellipse(ball1.xPos, ball1.yPos, 50, 50);
    ellipse(ball2.xPos, ball2.yPos, 50, 50);
    ball1.move();
    ball2.move();
    // fill(rVal, gVal, bVal);
    // ellipse(ball1XPos, ball1YPos, 50, 50);
    // ball1XPos += ballXSpeed;
    // ball1YPos += ballYSpeed;
    
    // if (ball1YPos >= 480){
    //     ballYSpeed = (Math.random() * (maxSpeed - minSpeed) + minSpeed) * -1;
    // }
    // if (ball1YPos <= 0){
    //     ballYSpeed = (Math.random() * (maxSpeed - minSpeed) + minSpeed);
    // }
    // if (ball1XPos >= 640){
    //     ballXSpeed = (Math.random() * (maxSpeed - minSpeed) + minSpeed) * -1;
    // }
    // if (ball1XPos <= 0){
    //     ballXSpeed = (Math.random() * (maxSpeed - minSpeed) + minSpeed);
    // }
}

